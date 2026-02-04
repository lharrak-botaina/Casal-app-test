const validation = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const checkCsrfToken = require('../middleware/csrf');
const { validate, Document } = require("../models/document");
const fileSaver = require('../services/fileSaver');
const express = require('express');
const router = express.Router();

router.post('/', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        let document = await isExist(req.body.name)
        if (document)
            return res.status(400).send({ message: 'Document already Exist' });

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
            
        let documents = await find(page, limit);

        if (documents && documents.length) return res.status(200).send(documents[0]);

        return res.status(200).send(documents);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

async function find(page, limit) {
    const documents = await Document.aggregate([
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $group: {
                _id: 'null',
                totalCount: { $sum: 1 },
                documents: { $push: '$$ROOT' }
            }
        },
        {
            $project: {
                totalCount: 1,
                documents: { "$slice": ["$documents", page * limit, limit] },
            }
        }]).allowDiskUse(true);

    return documents
}


async function add(data) {
    data.document = await saveDocumentPdf(data);

    const document = new Document({ ...data });

    return await document.save();
}

async function saveDocumentPdf(data) {
    const docName = `${data?.name}`;
    return await fileSaver.savePdf(data?.document, docName, 'Document');
}

async function isExist(name) {
    const document = await Document.findOne({ name : name });
    return document;
} 



module.exports = router;