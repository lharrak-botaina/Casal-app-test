const validation = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const company = require('../middleware/company');
const association = require('../middleware/association');
const checkCsrfToken = require('../middleware/csrf');
const { Job, validate } = require("../models/job");
const { Association } = require("../models/association");
const { Company } = require("../models/company");
const { Notification } = require("../models/notification");
const filterQuery = require("../helpers/filter-query-generator");
const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

router.post('/', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        const job = await add(req.body, req.user);

        await addNotification(job);

        return res.status(204).send({ message: 'Ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post('/company', [auth, checkCsrfToken, company, validation(validate)], async (req, res) => {
    try {
        const job = await addByCompany(req.body, req.user);

        await addNotification(job);

        return res.status(204).send({ message: 'Ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post('/association', [auth, checkCsrfToken, association, validation(validate)], async (req, res) => {
    try {
        const job = await addByAssociation(req.body, req.user);

        await addNotification(job);

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

        let jobs = await find(page, limit, filter);

        if (jobs && jobs.length) return res.status(200).send(jobs[0]);

        return res.status(200).send(jobs);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/company', [auth, checkCsrfToken, company], async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.pageSize) || 10;
        
        let filter = filterQuery.generator(req.query);
        filter.$and ? filter.$and.push({ createdBy: new ObjectId(req.user.sub) }) : filter = { createdBy: new ObjectId(req.user.sub) };

        let jobs = await find(page, limit, filter);

        if (jobs && jobs.length) return res.status(200).send(jobs[0]);

        return res.status(200).send(jobs);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/company/:id', [auth, checkCsrfToken, company], async (req, res) => {
    try {
        const job = await findCompanyJobById(req.params.id, req.user.sub);

        if (!job)
            return res.status(404).send({ message: 'Job not found' });

        if (job && job.length) return res.status(200).send(job[0]);

        return res.status(200).send(job);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/association', [auth, checkCsrfToken, association], async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.pageSize) || 10;

        const jobs = await findAssociationJobs(page, limit, req.user.sub);

        if (jobs && jobs.length) return res.status(200).send(jobs[0]);

        return res.status(200).send(jobs);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/association/:id', [auth, checkCsrfToken, association], async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: 'Invalid job ID' });

        const job = await findAssociationJobById(req.params.id, req.user.sub);

        if (!job)
            return res.status(404).send({ message: 'Job not found' });

        if (job && job.length) return res.status(200).send(job[0]);

        return res.status(200).send(job);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/list', [auth, checkCsrfToken], async (req, res) => {
    try {
        let jobs
        if (req.user.role == 'admin') 
            jobs = await findAdminJobs();
        else 
            jobs = await findAssociationJobsLight(req.user?.sub);

        return res.status(200).send(jobs);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/:id', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const job = await findJobById(req.params.id);

        if (!job)
            return res.status(404).send({ message: 'Job not found' });

        if (job && job.length) return res.status(200).send(job[0]);

        return res.status(200).send(job);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        const result = await update(req.params.id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Job not found.` });

        // Create notification for job update
        const job = await Job.findById(req.params.id);
        if (job) {
            await addNotification(job, 'updated');
        }

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/company/:id', [auth, checkCsrfToken, company, validation(validate)], async (req, res) => {
    try {
        const result = await updateCompanyJob(req.params.id, req.user.sub, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Job not found.` });

        // Create notification for job update
        const job = await Job.findById(req.params.id);
        if (job) {
            await addNotification(job, 'updated');
        }

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/association/:id', [auth, checkCsrfToken, association, validation(validate)], async (req, res) => {
    try {
        const result = await updateAssociationJob(req.params.id, req.user.sub, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Job not found.` });

        // Create notification for job update
        const job = await Job.findById(req.params.id);
        if (job) {
            await addNotification(job, 'updated');
        }

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/archive', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        // Get job before archiving to access sharedWith
        const job = await Job.findById(req.params.id);

        const result = await archive(req.params.id);
        if (result.n <= 0)
            return res.status(404).send({ message: `Job not found.` });

        // Create notification for job archive
        if (job) {
            await addNotification(job, 'archived');
        }

        return res.status(204).send({ message: 'Archived' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/company/:id/archive', [auth, checkCsrfToken, company], async (req, res) => {
    try {
        // Get job before archiving to access sharedWith
        const job = await Job.findById(req.params.id);

        const result = await archiveByCompany(req.params.id, req.user.sub);
        if (result.n <= 0)
            return res.status(404).send({ message: `Job not found.` });

        // Create notification for job archive
        if (job) {
            await addNotification(job, 'archived');
        }

        return res.status(204).send({ message: 'Archived' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/association/:id/archive', [auth, checkCsrfToken, association], async (req, res) => {
    try {
        // Get job before archiving to access sharedWith
        const job = await Job.findById(req.params.id);

        const result = await archiveByAssociation(req.params.id, req.user.sub);
        if (result.n <= 0)
            return res.status(404).send({ message: `Job not found.` });

        // Create notification for job archive
        if (job) {
            await addNotification(job, 'archived');
        }

        return res.status(204).send({ message: 'Archived' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

async function findJobById(id) {
    return await Job.find({ _id: id }).populate('sharedWith', 'raisonSocial').populate('company', 'name');
}

async function findCompanyJobById(id, companyId) {
    return await Job.find({ _id: id, createdBy : new ObjectId(companyId) }).populate('sharedWith', 'raisonSocial').populate('company', 'name');
}

async function findAssociationJobsLight(userId) {

    const association = await getAssociationByUserId(userId);
    if(!association) return [];

    return await Job.find({ $and : [
        { $or: [
            {sharedWith: { $in: [association._id] }},
            {createdBy: new ObjectId(userId)}
        ]},
        {status : 'active'}
    ]}).select("_id reference")
}

async function findAssociationJobs(page, limit, userId) {

    const association = await getAssociationByUserId(userId);
    if(!association) return [];

    let filter =  { $and : [
        { $or: [
            {sharedWith: { $in: [association._id] }},
            {createdBy: new ObjectId(userId)}
        ]},
        {status : 'active'}
    ]};

    return await find(page, limit, filter);
}

async function findAssociationJobById(id, userId) {
    const association = await getAssociationByUserId(userId);
    if(!association) return null;

    return await Job.find({ $and : [
        {_id : id},
        { $or: [
            {sharedWith: { $in: [association._id] }},
            {createdBy: new ObjectId(userId)}
        ]},
        {status : 'active'}
    ]}).populate('company', 'name').populate('sharedWith', 'raisonSocial');
}

async function findAdminJobs(userId) {

    return await Job.find({status : 'active'}).select("_id reference")
}


async function add(data, user) {
    const counter = await jobCounter();

    data.createdBy = user.sub;
    data.reference = `EO-${counter + 1}`;
    const job = new Job({ ...data });

    return await job.save();
}

async function addNotification(job, actionType = 'created') {
    // Always create notification so admins and associations can see all job activities
    const notif = new Notification({
        company: job?.company,
        jobId: job?._id,
        date: new Date(),
        createdBy: job?.createdBy,
        actionType: actionType,
        sharedWith: job?.sharedWith || [],
        viewedBy: [],
        viewedByAdmin: []
    });

    return await notif.save();
}

async function addByCompany(data, user) {
    const counter = await jobCounter();

    data.createdBy = user.sub;
    data.reference = `EO-${counter + 1}`;

    const company = await Company.findOne({userId : user.sub});

    if(company) data.company = company?._id;

    const job = new Job({ ...data });

    return await job.save();
}

async function addByAssociation(data, user) {
    const counter = await jobCounter();

    data.createdBy = user.sub;
    data.reference = `EO-${counter + 1}`;

    const job = new Job({ ...data });

    return await job.save();
}

async function updateAssociationJob(id, userId, job) {
    return await Job.updateOne({ "_id": id, "createdBy": new ObjectId(userId) },
        {
            $set: job
        },
        { new: true });
}

async function archiveByAssociation(id, userId) {
    return await Job.updateOne({ "_id": id, "createdBy": new ObjectId(userId) },
        {
            $set: {
                status: 'inactive'
            }
        },
        { new: true });
}

async function find(page, limit, filterQuery) {
    const jobs = await Job.aggregate([
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
        },
        {
            $unwind: {
                path: "$company",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: 'null',
                totalCount: { $sum: 1 },
                jobs: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                totalCount: 1,
                jobs: { "$slice": ["$jobs", page * limit, limit] },
            }
        }]).allowDiskUse(true);

    return jobs
}

async function update(id, job) {
    return await Job.updateOne({ "_id": id },
        {
            $set: job
        },
        { new: true });
}

async function updateCompanyJob(id, companyId, job) {
    return await Job.updateOne({ "_id": id, "createdBy" : new ObjectId(companyId) },
        {
            $set: job
        },
        { new: true });
}

async function archive(id) {
    return await Job.updateOne({ "_id": id },
        {
            $set: {
                status: 'inactive'
            }
        },
        { new: true });
}

async function archiveByCompany(id, companyId) {
    return await Job.updateOne({ "_id": id, "createdBy" : new ObjectId(companyId) },
        {
            $set: {
                status: 'inactive'
            }
        },
        { new: true });
}

async function jobCounter() {
    return await Job.countDocuments();
}

async function getAssociationByUserId(userId) {
    return await Association.findOne({userId : userId});
}

module.exports = router;