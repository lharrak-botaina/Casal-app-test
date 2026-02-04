const validation = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const checkCsrfToken = require('../middleware/csrf');
const { User, validate } = require("../models/user");
const account = require("../services/account");
const express = require('express');
const router = express.Router();

router.post('/', [auth, checkCsrfToken, admin, validation(validate)], async (req, res) => {
    try {
        let user = await findUserByEmail(req.body.email)
        if (user)
            return res.status(400).send({ message: 'User already Exist' });

        user = await account.add(req.body.email, req.body.password, req.body.role);

        return res.status(204).send({ message: 'Ok' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/connected', [auth, checkCsrfToken], async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).send({ message: 'User not found' });

        const user = await User.findById(req.user.sub);

        if (!user)
            return res.status(401).send({ message: 'User not found' });

        return res.send({ _id: user._id, email: user.email, role: user.role })

    } catch (error) {
        res.status(500).send(error.message);
    }
});

async function findUserByEmail(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user;
}

module.exports = router;