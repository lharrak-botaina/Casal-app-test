const validation = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const company = require('../middleware/company');
const checkCsrfToken = require('../middleware/csrf');
const { Association, validate, validateUpdateBody, validateUpdatePhotoBody, validateUpdatePassword } = require("../models/association");
const account = require("../services/account");
const filterQuery = require("../helpers/filter-query-generator");
const fs = require("fs");
const path = require("path");
const fileManager = require("../services/file")
const express = require('express');
const router = express.Router();

router.post('/', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        let association = await isExist(req.body.raisonSocial, req.body.email)
        if (association)
            return res.status(400).send({ message: 'Association already Exist' });

        const user = await account.add(req.body.email, req.body.password, 'association');

        association = await addAssociation(req.body, user._id);

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

        let associations = await find(page, limit, filter);

        if (associations && associations.length) return res.status(200).send(associations[0]);

        return res.status(200).send(associations);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/company', [auth, checkCsrfToken, company], async (req, res) => {
    try {
        const associations = await findLight();

        return res.status(200).send(associations);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.get('/:id', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationById(req.params.id);

        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        return res.status(200).send(association);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id', [auth, checkCsrfToken, admin, validation(validateUpdateBody)], async (req, res) => {
    try {
        let association = await findAssociationByRaisonSocial(req.body.raisonSocial);

        if (association && association._id != req.params.id)
            return res.status(400).send({ message: 'Raison Social already exist' });

        association = await findAssociationByEmail(req.body.email);

        if (association && association._id != req.params.id)
            return res.status(400).send({ message: 'Email already exist' });

        const result = await updateAssociation(req.params.id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Association not found.` });


        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id', [auth, checkCsrfToken, admin, validation(validateUpdateBody)], async (req, res) => {
    try {
        let association = await findAssociationByRaisonSocial(req.body.raisonSocial);

        if (association && association._id != req.params.id)
            return res.status(400).send({ message: 'Raison Social already exist' });

        association = await findAssociationByEmail(req.body.email);

        if (association && association._id != req.params.id)
            return res.status(400).send({ message: 'Email already exist' });

        const result = await updateAssociation(req.params.id, req.body);
        if (result.n <= 0)
            return res.status(404).send({ message: `Association not found.` });


        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/upload_photo', [auth, checkCsrfToken, admin, validation(validateUpdatePhotoBody)], async (req, res) => {
    try {
        let association = await findAssociationById(req.params.id);

        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        let photo, result;
        if (req.body.description == "AssociationLogo") {
            photo = await fileManager.savePicture(req.body.photo, association.raisonSocial, 'AssociationPhoto');
            result = await updateAssociation(req.params.id, { logo: photo });
            if (association.logo) deletePicture(association.logo);
        } else {
            photo = await fileManager.savePicture(req.body.photo, association.tip.fullname, 'AssociationPhoto');
            let tip = { ...association.tip.toObject(), photo };
            result = await updateAssociation(req.params.id, { tip });
            if (association.tip.photo) deletePicture(association.tip.photo);
        }

        if (result.n <= 0)
            return res.status(404).send({ message: `Association not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/:id/password', [auth, checkCsrfToken, admin, validation(validateUpdatePassword)], async (req, res) => {
    try {
        let association = await findAssociationById(req.params.id);

        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        const result = await account.update(association.userId, req.body.password)

        if (result.n <= 0)
            return res.status(404).send({ message: `Failed to update.` });


        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let association = await findAssociationById(req.params.id);

        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        await account.remove(association.userId);

        const result = await remove(association._id);

        if (result.n <= 0)
            return res.status(404).send({ message: `Failed to delete.` });


        return res.status(204).send({ message: 'Deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


async function find(page, limit, filterQuery) {
    const associations = await Association.aggregate([
        {
            $match: filterQuery
        },
        {
            $group: {
                _id: 'null',
                totalCount: { $sum: 1 },
                associations: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                totalCount: 1,
                associations: { "$slice": ["$associations", page * limit, limit] },
            }
        }]).allowDiskUse(true);

    return associations
}

async function findLight() {
    return await Association.find().select('raisonSocial')
}

async function findAssociationById(id) {
    return await Association.findById(id);
}

async function findAssociationByRaisonSocial(raisonSocial) {
    return await Association.findOne({ raisonSocial: raisonSocial });
}

async function findAssociationByEmail(email) {
    return await Association.findOne({ email: email });
}

async function isExist(raisonSocial, email) {
    const association = await Association.findOne({
        $or: [
            { raisonSocial: raisonSocial.toLowerCase() },
            { email: email.toLowerCase() }
        ]
    });
    return association;
}

async function addAssociation(data, userId) {

    data.logo = await fileManager.savePicture(data.logo, data.raisonSocial, 'AssociationPhoto');
    data.tip.photo = await fileManager.savePicture(data.tip.photo, data.tip.fullname, 'AssociationPhoto');
    data.userId = userId;

    const association = new Association({ ...data });

    await association.save();
    return association;
}

async function updateAssociation(id, association) {
    const result = await Association.updateOne({ "_id": id },
        {
            $set: association
        },
        { new: true });

    return result
}

async function remove(id) {
    const result = await Association.deleteOne({ "_id": id });

    return result
}

function deletePicture(pictureName) {
    const picturePath = `${path.join(__dirname, '../public')}/associations`;

    return fs.unlinkSync(picturePath + pictureName);
}

module.exports = router;