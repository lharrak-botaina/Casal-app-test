const validation = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const checkCsrfToken = require('../middleware/csrf');
const { validate, Passwork } = require("../models/passwork");
const { Association } = require("../models/association");
const filterQuery = require("../helpers/filter-query-generator");
const fileSaver = require('../services/fileSaver');
const path = require("path");
const express = require('express');
const { func } = require('@hapi/joi');
const router = express.Router();

router.post('/', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        await add(req.body);

        return res.status(204).send({ message: 'Ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.pageSize) || 10;
        const filter = filterQuery.generator(req.query);

        let passworks = await find(page, limit, filter);

        if (passworks && passworks.length) return res.status(200).send(passworks[0]);

        return res.status(200).send(passworks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/list', [auth, checkCsrfToken], async (req, res) => {
    try {
        let passworks
        if (req.user.role == 'admin') 
            passworks = await findAdminPassworks();
        else 
            passworks = await findAssociationPassworks(req.user?.sub);

        return res.status(200).send(passworks);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/:id', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const passwork = await findPassworkById(req.params.id);

        if (!passwork)
            return res.status(404).send({ message: 'Passwork not found' });

        return res.status(200).send(passwork);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        const result = await update(req.params.id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Passwork not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/modules', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        if (!req.body.training_modules) return res.status(404).send({ message: 'Form validation error' });

        let passwork = await findPassworkById(req.params.id);

        if (!passwork)
            return res.status(404).send({ message: 'Passwork not found' });

        req.body["title"] = passwork.title;
        console.log(passwork);
        const training_module_pdf = await saveTrainigModulePdf(req.body);
        const result = await update(req.params.id, { training_modules: training_module_pdf });
        
        if (passwork.training_modules) {
            const filePath = `${path.join(__dirname, '../public')}/passworks/`;
            fileSaver.deleteFile(passwork.training_modules, filePath);
        } 

        if (result.n <= 0)
            return res.status(404).send({ message: `Passwork not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/planning', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        if (!req.body.training_planning) return res.status(404).send({ message: 'Form validation error' });

        let passwork = await findPassworkById(req.params.id);

        if (!passwork)
            return res.status(404).send({ message: 'Passwork not found' });

        req.body.title = passwork.title;
        const training_planning_pdf = await saveTrainigPlanningPdf(req.body);
        const result = await update(req.params.id, { training_planning: training_planning_pdf });
        
        if (passwork.training_planning) {
            const filePath = `${path.join(__dirname, '../public')}/passworks/`;
            fileSaver.deleteFile(passwork.training_planning, filePath);
        } 

        if (result.n <= 0)
            return res.status(404).send({ message: `Passwork not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/archive', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const result = await archive(req.params.id);
        if (result.n <= 0)
            return res.status(404).send({ message: `Passwork not found.` });

        return res.status(204).send({ message: 'Archived' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


async function add(data) {
    data.training_modules = await saveTrainigModulePdf(data);
    data.training_planning = await saveTrainigPlanningPdf(data);

    const passwork = new Passwork({ ...data });

    return await passwork.save();
}

async function saveTrainigModulePdf(data) {
    const trainingModuleFileName = `${data?.title}-trainingModule`;
    return await fileSaver.savePdf(data?.training_modules, trainingModuleFileName, 'Passwork');
}

async function saveTrainigPlanningPdf(data) {
    const trainingPlanningFileName = `${data?.title}-trainingPlanning`;
    return await fileSaver.savePdf(data?.training_planning, trainingPlanningFileName, 'Passwork');
}

async function findAssociationPassworks(userId) {

    const association = await getAssociationByUserId(userId);
    if(!association) return [];

    return await Passwork.find({ $and : [
        {associations: { $in: [association._id] }},
        {status : 'active'}
    ]}).select("_id title")
}

async function findAdminPassworks(userId) {

    return await Passwork.find({status : 'active'}).select("_id title")
}

async function find(page, limit, filterQuery) {
    const passworks = await Passwork.aggregate([
        {
            $match: filterQuery
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $lookup: {
                from: 'companies',
                localField: 'company',
                foreignField: '_id',
                as: 'company'
            }
        }, {
            $unwind: {
                path: "$company",
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: 'associations',
                localField: 'associations',
                foreignField: '_id',
                as: 'associations'
            }
        },
        {
            $project: {
                _id: 1,
                "associations._id": 1,
                "associations.raisonSocial": 1,
                title: 1,
                module: 1,
                "company._id": 1,
                "company.name": 1,
                training_center: 1,
                nbr_beneficiaries: 1,
                start_date: 1,
                end_date: 1,
                training_modules: 1,
                training_planning: 1,
                status : 1
            }
        },
        {
            $group: {
                _id: 'null',
                totalCount: { $sum: 1 },
                passworks: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                totalCount: 1,
                passworks: { "$slice": ["$passworks", page * limit, limit] },
            }
        }]).allowDiskUse(true);

    return passworks
}

async function findPassworkById(id) {
    return await Passwork.findOne({_id : id})
        .populate('company', 'id name')
        .populate('associations', 'id raisonSocial');
}

async function getAssociationByUserId(userId) {
    return await Association.findOne({userId : userId});
}

async function update(id, passwork) {
    return await Passwork.updateOne({ "_id": id },
        {
            $set: passwork
        },
        { new: true });
}

async function archive(id) {
    return await Passwork.updateOne({ "_id": id },
        {
            $set: {
                status : 'inactive'
            }
        },
        { new: true });
}


module.exports = router;