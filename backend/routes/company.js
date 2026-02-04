const validation = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const company = require('../middleware/company');
const association = require('../middleware/association');
const checkCsrfToken = require('../middleware/csrf');
const { Company, validate, validateUpdateBody, validateUpdatePassword, validateUpdateLogo, validateUpdateColaboration } = require("../models/company");
const filterQuery = require("../helpers/filter-query-generator");
const account = require("../services/account");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const fileManager = require("../services/file")
const express = require('express');
const router = express.Router();

router.post('/', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        let company = await findCompanyByName(req.body?.name)
        if (company)
            return res.status(400).send({ message: 'Company already Exist' });

        company = await findCompanyByEmail(req.body?.email)
        if (company)
            return res.status(400).send({ message: 'Company already Exist' });

        let user = await account.isExist(req.body?.email);
        if(user)
            return res.status(400).send({ message: 'Email already used' });

        user = await account.add(req.body?.email, req.body?.password, 'company');

        company = await add(req.body, user?._id, req.user);

        return res.status(204).send({ message: 'Ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post('/association', [auth, checkCsrfToken, association, validation(validate)], async (req, res) => {
    try {
        let comp = await findCompanyByName(req.body?.name);
        if (comp)
            return res.status(400).send({ message: 'Company already Exist' });

        comp = await findCompanyByEmail(req.body?.email);
        if (comp)
            return res.status(400).send({ message: 'Company already Exist' });

        let user = await account.isExist(req.body?.email);
        if (user)
            return res.status(400).send({ message: 'Email already used' });

        user = await account.add(req.body?.email, req.body?.password, 'company');

        comp = await addByAssociation(req.body, user?._id, req.user.sub);

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
        const filter = filterQuery.generator(req.query);

        let companies = await find(page, limit, filter);

        if (companies && companies.length) return res.status(200).send(companies[0]);

        return res.status(200).send(companies);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/association', [auth, checkCsrfToken, association], async (req, res) => {
    try {
        const page = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.pageSize) || 10;
        let filter = filterQuery.generator(req.query);

        const ObjectId = mongoose.Types.ObjectId;
        filter.$and ? filter.$and.push({ createdBy: new ObjectId(req.user.sub) }) : filter = { createdBy: new ObjectId(req.user.sub) };

        let companies = await find(page, limit, filter);

        if (companies && companies.length) return res.status(200).send(companies[0]);

        return res.status(200).send(companies);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/association/:id', [auth, checkCsrfToken, association], async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: 'Invalid company ID' });

        const comp = await findCompanyById(req.params.id);

        if (!comp)
            return res.status(404).send({ message: 'Company not found' });

        if (!comp.createdBy || comp.createdBy.toString() !== req.user.sub)
            return res.status(403).send({ message: 'Access denied.' });

        return res.status(200).send(comp);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/user', [auth, checkCsrfToken], async (req, res) => {
    try {
        const company = await findCompanyByUserId(req.user?.sub);

        if (!company)
            return res.status(404).send({ message: 'Company not found' });

        return res.status(200).send(company);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/:id', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const company = await findCompanyById(req.params.id);

        if (!company)
            return res.status(404).send({ message: 'Company not found' });

        return res.status(200).send(company);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/colaboration', [auth, checkCsrfToken, company, validation(validateUpdateColaboration)], async (req, res) => {
    try {
        const company = await findCompanyByUserId(req.user?.sub);

        if (!company)
            return res.status(404).send({ message: 'Company not found' });

        const result = await update(company._id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Company not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/association/:id', [auth, checkCsrfToken, association, validation(validateUpdateBody)], async (req, res) => {
    try {
        const comp = await findCompanyById(req.params.id);
        if (!comp)
            return res.status(404).send({ message: 'Company not found' });

        if (!comp.createdBy || comp.createdBy.toString() !== req.user.sub)
            return res.status(403).send({ message: 'Access denied.' });

        const result = await update(req.params.id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Company not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/association/:id/password', [auth, checkCsrfToken, association, validation(validateUpdatePassword)], async (req, res) => {
    try {
        let comp = await findCompanyById(req.params.id);
        if (!comp)
            return res.status(404).send({ message: 'Company not found' });

        if (!comp.createdBy || comp.createdBy.toString() !== req.user.sub)
            return res.status(403).send({ message: 'Access denied.' });

        const result = await account.update(comp.userId, req.body?.password);
        if (result.n <= 0)
            return res.status(404).send({ message: `Failed to update.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/association/:id/upload_photo', [auth, checkCsrfToken, association, validation(validateUpdateLogo)], async (req, res) => {
    try {
        let comp = await findCompanyById(req.params.id);
        if (!comp)
            return res.status(404).send({ message: 'Company not found' });

        if (!comp.createdBy || comp.createdBy.toString() !== req.user.sub)
            return res.status(403).send({ message: 'Access denied.' });

        const photo = await fileManager.savePicture(req.body.logo, comp.name, 'CompanyLogo');
        const result = await update(req.params.id, { logo: photo });
        if (comp.logo) deletePicture(comp.logo);

        if (result.n <= 0)
            return res.status(404).send({ message: `Company not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.delete('/association/:id', [auth, checkCsrfToken, association], async (req, res) => {
    try {
        let comp = await findCompanyById(req.params.id);
        if (!comp)
            return res.status(404).send({ message: 'Company not found' });

        if (!comp.createdBy || comp.createdBy.toString() !== req.user.sub)
            return res.status(403).send({ message: 'Access denied.' });

        await account.remove(comp?.userId);

        const result = await remove(comp._id);
        if (result.n <= 0)
            return res.status(404).send({ message: `Failed to delete.` });

        return res.status(204).send({ message: 'Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        const result = await update(req.params.id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Company not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/password', [auth, checkCsrfToken, admin, validation(validateUpdatePassword)], async (req, res) => {
    try {
        let company = await findCompanyById(req.params.id);

        if (!company)
            return res.status(404).send({ message: 'Company not found' });

        const result = await account.update(company.userId, req.body?.password)

        if (result.n <= 0)
            return res.status(404).send({ message: `Failed to update.` });


        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let company = await findCompanyById(req.params.id);
        if (!company)
            return res.status(404).send({ message: 'Company not found' });
        
        await account.remove(company?.userId);

        const result = await remove(company._id);
        if (result.n <= 0)
            return res.status(404).send({ message: `Failed to delete.` });

        return res.status(204).send({ message: 'Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/upload_photo', [auth, checkCsrfToken, admin, validation(validateUpdateLogo)], async (req, res) => {
    try {
        let company = await findCompanyById(req.params.id);

        if (!company)
            return res.status(404).send({ message: 'Company not found' });

        const photo = await fileManager.savePicture(req.body.logo, company.name, 'CompanyLogo');
        const result = await update(req.params.id, { logo: photo });
        if (company.logo) deletePicture(company.logo);
        

        if (result.n <= 0)
            return res.status(404).send({ message: `Company not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

async function findCompanyByName(name) {
    return await Company.findOne({ name: name });
}

async function findCompanyByEmail(email) {
    return await Company.findOne({ email: email?.toLowerCase() });
}

async function findCompanyById(id) {
    return await Company.findById(id);
}
async function findCompanyByUserId(id) {
    return await Company.findOne({userId : id});
}

async function add(data, userId, reqUser) {
    data.userId = userId;

    if (reqUser.role === 'association') {
        data.createdByAssociation = reqUser.associationId;
    }

    data.logo = await fileManager.savePicture(
      data.logo,
      data.name,
      'CompanyLogo'
    );

    const company = new Company({ ...data });
    return await company.save();
}


async function addByAssociation(data, userId, createdBy) {
    data.userId = userId;
    data.createdBy = createdBy;
    data.logo = await fileManager.savePicture(data.logo, data.name, 'CompanyLogo');

    const company = new Company({ ...data });

    return await company.save();
}

async function find(page, limit, filterQuery) {
    const companies = await Company.aggregate([
        {
            $match: filterQuery
        },
        {
            $group: {
                _id: 'null',
                totalCount: { $sum: 1 },
                companies: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                totalCount: 1,
                companies: { "$slice": ["$companies", page * limit, limit] },
            }
        }]).allowDiskUse(true);

    return companies
}

async function update(id, company) {
    return await Company.updateOne({ "_id": id },
        {
            $set: company
        },
        { new: true });
}

async function remove(id) {
    return await Company.deleteOne({ "_id": id });
}

function deletePicture(pictureName) {
    const picturePath = path.join(__dirname, '../public', 'companies', pictureName);

    if (fs.existsSync(picturePath)) {
        return fs.unlinkSync(picturePath);
    }
}

module.exports = router;