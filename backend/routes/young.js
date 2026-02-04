const validation = require('../middleware/validate');
const auth = require('../middleware/auth');
const checkCsrfToken = require('../middleware/csrf');
const admin = require('../middleware/admin');
const { Young, validate, validateInsertion } = require("../models/young");
const { Association } = require("../models/association");
const { Company } = require("../models/company");
const { Job } = require("../models/job");
const fileManager = require('../services/fileSaver');
const filterQuery = require("../helpers/filter-query-generator");
const path = require("path");
const express = require('express');
const router = express.Router();
var flatten = require('flat');

var YOUNG_PHOTO_PATH = `${path.join(__dirname, '../public')}/youth/photos/`;
var YOUNG_JUSTIFICATION_PATH = `${path.join(__dirname, '../public')}/youth/justifications/`

router.post('/', [auth, checkCsrfToken, validation(validate)], async (req, res) => {
    try {
        await add(req.body, req.user?.sub);

        return res.status(204).send({ message: 'Ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/', [auth, checkCsrfToken], async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.pageSize) || 10;

        const association = await findAssociationByUserId(req.user?.sub);

        if (!association) return res.status(404).send();

        req.query.association = association._id.toString();

        const filter = filterQuery.generator(req.query);

        let youth = await find(page, limit, filter);

        if (youth && youth.length) return res.status(200).send(youth[0]);

        return res.status(200).send(youth);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/admin', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.pageSize) || 10;

        const filter = filterQuery.generator(req.query);

        let youth = await find(page, limit, filter);

        if (youth && youth.length) return res.status(200).send(youth[0]);

        return res.status(200).send(youth);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/company', [auth, checkCsrfToken], async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.pageSize) || 10;

        const filter = filterQuery.generator(req.query);

        let youth = await findYouthLight(page, limit, filter);
        let totalCount = await CountYouth(filter);
        const result = { totalCount, youth };

        if (youth && youth.length) return res.status(200).send(result);

        return res.status(200).send(youth);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/:id', [auth, checkCsrfToken], async (req, res) => {
    try {
        let filter = { $and: [{ _id: req.params.id }] };

        if (req.user.role == 'association') {
            const association = await findAssociationByUserId(req.user?.sub);
            if (!association) return res.status(404).send();

            filter.$and.push({ createdBy: { $in: [association._id] } });
        }

        const young = await findYoung(filter);

        if (!young)
            return res.status(404).send({ message: 'Not found' });

        return res.status(200).send(young);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/:id/details', [auth, checkCsrfToken], async (req, res) => {
    try {
        let filter = { $and: [{ _id: req.params.id }] };
        let association;

        let young = await findYoungLight(filter);

        if (!young)
            return res.status(404).send({ message: 'Not found' });

        if(young.createdBy){
            association = await findAssociationById(young.createdBy);
            if(association) {
                const { raisonSocial } = association;
                young = {...young.toObject(), associationName : raisonSocial}
            }
        }

        return res.status(200).send(young);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id', [auth, checkCsrfToken], async (req, res) => {
    try {
        let filter = { $and: [{ _id: req.params.id }] };

        if (req.user.role == 'association') {
            const association = await findAssociationByUserId(req.user?.sub);
            if (!association) return res.status(404).send();

            filter.$and.push({ createdBy: { $in: [association._id] } });
        }

        const young = await findYoung(filter);
        if (!young) return res.status(404).send({ message: 'Not found' });

        const result = await updateYoungInfo(req.params.id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/photo', [auth, checkCsrfToken], async (req, res) => {
    try {
        if (!req.body.photo) return res.status(400).send({ message: `No picture provided.` });

        let filter = { $and: [{ _id: req.params.id }] };

        if (req.user.role == 'association') {
            const association = await findAssociationByUserId(req.user?.sub);
            if (!association) return res.status(404).send();

            filter.$and.push({ createdBy: { $in: [association._id] } });
        }

        const young = await findYoung(filter);
        if (!young) return res.status(404).send({ message: 'Not found' });

        const OldPhoto = young?.personal_info?.photo;

        const result = await updateYoungPhoto(req.params.id, req.body.photo, young);
        if (result.n <= 0)
            return res.status(404).send({ message: `Not found.` });

        if (OldPhoto) {
            fileManager.deleteFile(OldPhoto, YOUNG_PHOTO_PATH);
        }

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/insertion', [auth, checkCsrfToken, validation(validateInsertion)], async (req, res) => {
    try {
        let filter = { $and: [{ _id: req.params.id }] };

        if (req.user.role == 'association') {
            const association = await findAssociationByUserId(req.user?.sub);
            if (!association) return res.status(404).send();

            filter.$and.push({ createdBy: { $in: [association._id] } });
        }

        const young = await findYoung(filter);
        if (!young) return res.status(404).send({ message: 'Not found' });

        const result = await addNewYoungInsertion(req.params.id, req.body, young);

        if (result.n <= 0)
            return res.status(404).send({ message: `Not found.` });
        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/justification', [auth, checkCsrfToken], async (req, res) => {
    try {
        if (req.body.index < 0 || req.body.index === undefined || req.body.index === null)
            return res.status(400).send({ message: `Invalid index provided.` });

        if (!req.body.file)
            return res.status(400).send({ message: `No file provided.` });

        let filter = { $and: [{ _id: req.params.id }] };

        if (req.user.role == 'association') {
            const association = await findAssociationByUserId(req.user?.sub);
            if (!association) return res.status(404).send();

            filter.$and.push({ createdBy: { $in: [association._id] } });
        }

        const young = await findYoung(filter);
        if (!young) return res.status(404).send({ message: 'Not found' });

        if (!young.insertion || !young.insertion.list || young.insertion.list.length === 0)
            return res.status(400).send({ message: `No insertions found for this youth.` });

        if (req.body.index >= young.insertion.list.length)
            return res.status(400).send({ message: `Insertion index ${req.body.index} not found. Youth has ${young.insertion.list.length} insertion(s).` });

        const OldJustification = young?.insertion?.list[req.body.index]?.tracking_after?.justification;

        const result = await updateYoungInsertionJustification(req.params.id, req.body, young);
        if (result.n <= 0)
            return res.status(404).send({ message: `Not found.` });

        if (OldJustification) {
            fileManager.deleteFile(OldJustification, YOUNG_JUSTIFICATION_PATH);
        } 

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let young = await findYoungById(req.params.id);

        if (!young)
            return res.status(404).send({ message: 'Not found' });

        const result = await remove(young._id);

        if (result.n <= 0)
            return res.status(404).send({ message: `Failed to delete.` });

        return res.status(204).send({ message: 'Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

async function add(data, userId) {
    data.personal_info.identifier = generateId();

    for await (let insertion of data.insertion.list) {

        for await (let tb of insertion.tracking_before) {
            if (!tb?.companyId) continue;

            let company = await Company.findById(tb.companyId);
            if (!company) continue;

            tb.companyName = company.name;
        };

        if (insertion?.tracking_after?.companyId) {
            let company = await Company.findById(insertion.tracking_after.companyId);
            if (company) {
                insertion.tracking_after.companyName = company.name;
            }
        }

        if (insertion?.tracking_after?.isJobExists && insertion?.tracking_after?.jobId){
            let job = await Job.findById(insertion.tracking_after.jobId);
            if (job) {
                insertion.tracking_after.jobName = job.reference;
            }    
        }
    };

    data.personal_info.photo = await fileManager.savePicture(data?.personal_info?.photo, data.personal_info.identifier, 'YoungPhoto');

    if (data.insertion.list.length > 0 && data.insertion.list[0].tracking_after.justification) {
        data.insertion.list[0].tracking_after.justification =
            await fileManager.savePdf(data.insertion.list[0].tracking_after?.justification, data.personal_info.identifier, 'YoungJustification');

        data.status = true;
    }

    data.personal_info.rate = calculatePersonalInfoCompletionRate(data.personal_info);
    data.skills_assessment.rate = calculateSkillsAssessmentCompletionRate(data.skills_assessment);
    data.capacity_building.rate = calculateCapacityBuildingCompletionRate(data.capacity_building);
    data.passwork.rate = calculatePassworkCompletionRate(data.passwork);
    data.insertion.rate = calculateInsertionCompletionRate(data.insertion);

    const association = await findAssociationByUserId(userId);

    data.createdBy = association?._id;

    const young = new Young({ ...data });

    return await young.save();
}

async function find(page, limit, filterQuery) {
    const youth = await Young.aggregate([
        {
            $match: filterQuery
        },
        {
            $unwind: {
                path: "$passwork",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $unwind: {
                path: "$passwork.trainings",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'passworks',
                localField: 'passwork.trainings.passwork_training',
                foreignField: '_id',
                as: 'passwork.trainings.passwork_training'
            }
        }, {
            $unwind: {
                path: "$passwork.trainings.passwork_training",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $group: {
                _id: '$_id',
                root: { $mergeObjects: '$$ROOT' },
                trainings: {
                    $push: '$passwork.trainings'
                },
            }
        }, {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: ['$root', '$$ROOT']
                }
            }
        }, {
            $project: {
                _id: 1,
                status: 1,
                personal_info: 1,
                skills_assessment: 1,
                capacity_building: 1,
                insertion: 1,
                createdBy: 1,
                createdAt: 1,
                "passwork.trainings": "$trainings",
                "passwork.rate": "$passwork.rate"
            }
        },
        {
            $sort: { "personal_info.isPriority": -1, "personal_info.inscription_date": -1 }
        },
        {
            $group: {
                _id: 'null',
                totalCount: { $sum: 1 },
                youth: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                totalCount: 1,
                youth: { "$slice": ["$youth", page * limit, limit] },
            }
        }]).allowDiskUse(true);

    return youth
}

async function findYouthLight(page, limit, filter) {
    return await Young.find(filter).select('personal_info.fullname personal_info.photo').skip(page * limit).limit(limit);
}

async function CountYouth(filter) {
    return await Young.countDocuments(filter);
}

async function findAssociationByUserId(userId) {
    return await Association.findOne({ userId: userId });
}

async function findAssociationById(id) {
    return await Association.findById(id);
}

async function findYoung(filter) {
    return await Young.findOne(filter).populate('passwork.trainings.passwork_training', 'id title start_date');
}

async function findYoungLight(filter) {
    return await Young.findOne(filter).populate('passwork.trainings.passwork_training', 'id title start_date')
    .select(
        'personal_info.fullname personal_info.city personal_info.gendre personal_info.hobbies personal_info.birth_date personal_info.photo personal_info.civil_status personal_info.current_function personal_info.nationality personal_info.nationality_comment personal_info.identifier skills_assessment capacity_building passwork createdBy'
    );
}

async function findYoungById(id) {
    return await Young.findById(id);
}

async function updateYoungInfo(id, young) {
    let youngFromDb = await findYoungById(id);
    if (!youngFromDb) throw new Error();

    await setYoungInsertionCompanyName(young);

    youngFromDb = youngFromDb.toObject();

    let updatedYoungFromDb = {
        ...youngFromDb,
        personal_info: { ...youngFromDb.personal_info, ...young.personal_info },
        skills_assessment: { ...youngFromDb.skills_assessment, ...young.skills_assessment },
        capacity_building: { ...youngFromDb.capacity_building, ...young.capacity_building },
        passwork: { ...youngFromDb.passwork, ...young.passwork },
        insertion: { ...youngFromDb.insertion, ...young.insertion }
    };

    const updatedYoungRates = setYoungRates(updatedYoungFromDb);

    return await update(id, updatedYoungRates);
}

async function updateYoungPhoto(id, photo, youngToUpdate) {

    youngToUpdate = youngToUpdate.toObject();

    youngToUpdate.personal_info.photo = await fileManager.savePicture(photo, youngToUpdate?.personal_info.identifier, 'YoungPhoto');

    youngToUpdate.personal_info.rate = calculatePersonalInfoCompletionRate(youngToUpdate.personal_info);

    return await update(id, youngToUpdate);
}

async function updateYoungInsertionJustification(id, data, youngToUpdate) {

    youngToUpdate = youngToUpdate.toObject();
    const index = data.index;

    youngToUpdate.insertion.list[index].tracking_after.justification =
        await fileManager.savePdf(data.file, youngToUpdate.personal_info.identifier, 'YoungJustification');

    if (youngToUpdate.insertion.list.length == (index + 1))
        youngToUpdate.status = true;

    youngToUpdate.insertion.rate = calculateInsertionCompletionRate(youngToUpdate.insertion);

    return await update(id, youngToUpdate);
}

async function addNewYoungInsertion(id, data, youngToUpdate) {

    youngToUpdate = youngToUpdate.toObject();

    for await (let tb of data.tracking_before) {
        if (!tb?.companyId) continue;

        let company = await Company.findById(tb.companyId);
        if (!company) continue;

        tb.companyName = company.name;
    };

    if (data?.tracking_after?.companyId) {
        let company = await Company.findById(data.tracking_after.companyId);
        if (company) {
            data.tracking_after.companyName = company.name;
        }
    }

    if (data?.tracking_after?.isJobExists && data?.tracking_after?.jobId){
        let job = await Job.findById(data.tracking_after.jobId);
        if (job) {
            data.tracking_after.jobName = job.reference;
        }    
    }

    youngToUpdate.insertion.list.push(data);
    youngToUpdate.status = false;

    const index = youngToUpdate.insertion.list.length - 1;


    if (youngToUpdate.insertion.list[index].tracking_after?.justification){
        youngToUpdate.insertion.list[index].tracking_after.justification =
        await fileManager.savePdf(youngToUpdate.insertion.list[index].tracking_after?.justification, youngToUpdate.personal_info.identifier, 'YoungJustification');
    
        youngToUpdate.status = true;
    }


    youngToUpdate.insertion.rate = calculateInsertionCompletionRate(youngToUpdate.insertion);

    return await update(id, youngToUpdate);
}

async function update(id, young) {
    return await Young.updateOne({ "_id": id },
        {
            $set: young
        },
        { new: true });
}

async function setYoungInsertionCompanyName(young) {
    let insertionsList = []
    for await (let insertion of young.insertion.list) {
        for await (let tb of insertion.tracking_before) {
            if (!tb?.companyId) continue;

            let company = await Company.findById(tb.companyId);
            if (!company) continue;

            tb.companyName = company.name;
        };

        if (insertion?.tracking_after?.companyId) {
            let company = await Company.findById(insertion.tracking_after.companyId);
            if (company) {
                insertion.tracking_after.companyName = company.name;
            }
        }

        if (insertion?.tracking_after?.isJobExists && insertion?.tracking_after?.jobId){
            let job = await Job.findById(insertion.tracking_after.jobId);
            if (job) {
                insertion.tracking_after.jobName = job.reference;
            }    
        }

        insertionsList.push(insertion);
    };

    return insertionsList;
}

async function remove(id) {
    return await Young.deleteOne({ "_id": id });
}

function setYoungRates(young) {
    young.personal_info.rate = calculatePersonalInfoCompletionRate(young.personal_info);
    young.skills_assessment.rate = calculateSkillsAssessmentCompletionRate(young.skills_assessment);
    young.capacity_building.rate = calculateCapacityBuildingCompletionRate(young.capacity_building);
    young.passwork.rate = calculatePassworkCompletionRate(young.passwork);
    young.insertion.rate = calculateInsertionCompletionRate(young.insertion);

    return young;
}

function calculatePersonalInfoCompletionRate(data) {
    const nbrOfFields = 23;
    let filledFields = 0;

    for (var key in data) {
        if (data[key] && data[key] != []) {
            filledFields++;
        }
    }

    data.physical_state.addiction.status && !data.physical_state.addiction.description ? filledFields-- : filledFields++;
    data.physical_state.handicap.status && !data.physical_state.handicap.description ? filledFields-- : filledFields++;
    data.physical_state.health_issue.status && !data.physical_state.health_issue.chronic_illness ? filledFields-- : filledFields++;
    data.physical_state.health_issue.status && !data.physical_state.health_issue.ongoing_treatment ? filledFields-- : filledFields++;

    return Math.floor((filledFields * 100) / nbrOfFields);
}

function calculateSkillsAssessmentCompletionRate(data) {
    let filledFields = 0;
    let flatData = flatten(data);
    let nbrOfFields = Object.keys(flatData).length;

    for (var key in flatData) {
        if (flatData[key] && flatData[key] != []) {
            filledFields++;
        }
    }

    return Math.floor((filledFields * 100) / nbrOfFields);
}

function calculateCapacityBuildingCompletionRate(data) {
    let filledFields = 0;
    const nbrOfRequiredTraining = 4;
    let flatData = flatten(data);
    let nbrOfFields = Object.keys(flatData).length;

    for (var key in flatData) {
        if (flatData[key] && flatData[key] != []) {
            filledFields++;
        }
    }

    return Math.floor((filledFields * 100) / nbrOfFields);
}

function calculatePassworkCompletionRate(data) {
    let filledFields = 0;
    let flatData = flatten(data);
    let nbrOfFields = Object.keys(flatData).length;

    for (var key in flatData) {
        if (flatData[key] && flatData[key] != [] || typeof flatData[key] === 'boolean') {
            filledFields++;
        }
    }

    return Math.floor((filledFields * 100) / nbrOfFields);
}

function calculateInsertionCompletionRate(data) {
    let filledFields = 0;
    let flatData = flatten(data);
    let nbrOfFields = Object.keys(flatData).length;

    for (var key in flatData) {
        if (flatData[key] && flatData[key] != [] || typeof flatData[key] === 'boolean') {
            filledFields++;
        }
    }

    return Math.floor((filledFields * 100) / nbrOfFields);
}

function generateId() {
    return shortId();
}

function shortId() {
    const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let res = "";
    for(let i = 0; i < 15; i++) {
        let rnd = Math.floor(Math.random() * list.length);
        res = res + list.charAt(rnd);
    }
    return res;
}


module.exports = router;