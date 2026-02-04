const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const checkCsrfToken = require('../middleware/csrf');
const stasService = require('../services/stats');
const express = require('express');
const router = express.Router();
const { Association } = require("../models/association");

router.get('/1', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfYoungAddedStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/association/1', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req?.user?.sub);
        if (!association) return res.status(404).send();

        return res.send(await stasService.numberOfYoungAddedStats(association?._id?.toString()))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/2', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfYouthHaveMoreThanThreeCapacityBuildingStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/association/2', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req?.user?.sub);
        if (!association) return res.status(404).send();

        return res.send(await stasService.numberOfYouthHaveMoreThanThreeCapacityBuildingStats(association?._id?.toString()))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/3', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfYouthHavePassworkTrainingStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/association/3', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req?.user?.sub);
        if (!association) return res.status(404).send();

        return res.send(await stasService.numberOfYouthHavePassworkTrainingStats(association?._id?.toString()))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/4', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfFormalInsertionStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/association/4', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req?.user?.sub);
        if (!association) return res.status(404).send();

        return res.send(await stasService.numberOfFormalInsertionStats(association?._id?.toString()))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/5', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfInformalInsertionStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/association/5', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req?.user?.sub);
        if (!association) return res.status(404).send();

        return res.send(await stasService.numberOfInformalInsertionStats(association?._id?.toString()))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/6', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfInsertionsByActivityAreaStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/association/6', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req?.user?.sub);
        if (!association) return res.status(404).send();

        return res.send(await stasService.numberOfInsertionsByActivityAreaStats(association?._id?.toString()))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/7', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfInsertionsByContractTypeStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/8', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfInsertionsByContractDurationStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/9', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        return res.send(await stasService.numberOfInsertionsBySalaryStats(req.query.associationId))
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/10', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.numberOfCompanies();
        return res.send({result})
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/11', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.numberOfInvolvedCompaniesStats(req.query.associationId);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/12', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.numberOfAssociationPassworks(req.query.associationId);
        return res.send({result});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/association/12', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req?.user?.sub);
        if (!association) return res.status(404).send();

        let result = await stasService.numberOfAssociationPassworks(association?._id);
        return res.send({result});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/13', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const contractName = req.query.contract || "";

        let result = await stasService.numberOfInsertionsByOneContractTypeStats(contractName, req.query.associationId);
        return res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/14', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.PercentageInsertionByTotalYouth(req.query.associationId);
        return res.send({result});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/15', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.PercentageInsertionByCapacityBuilding(req.query.associationId);
        return res.send({result});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/16', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.PercentageInsertionByPasswork(req.query.associationId);
        return res.send({result});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/17', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.numberOfInsertionStats();
        return res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/18', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        let result = await stasService.TopThreeOfAssociationsByInsertionStats();
        return res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

async function findAssociationByUserId(userId) {
    return await Association.findOne({ userId: userId });
}

module.exports = router;