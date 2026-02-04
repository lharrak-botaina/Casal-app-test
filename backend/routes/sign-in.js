const validate = require('../middleware/validate')
const bcrypt = require('bcrypt');
const { User, validateAuth, createCsrfToken } = require("../models/user");
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    try {     
        if(!req.body.email || !req.body.password)
            return res.status(400).send({message : 'Invalid email or password.'});

        let user = await findUserByEmail(req.body.email)
        if(!user)   
            return res.status(400).send({message : 'Invalid email or password.'});

        const validPassword = await validatePassword(req.body.password, user.password);
        if(!validPassword)   
            return res.status(400).send({message : 'Invalid email or password.'});
        
        const token = user.generateAuthToken();

        var csrfToken = createCsrfToken();

        const cookieExpirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10) // 10 YEARS

        res.cookie("SESSIONID", token, {httpOnly:true/*, secure:true*/, expires : cookieExpirationDate });

        res.cookie("XSRF-TOKEN", csrfToken, {expires : cookieExpirationDate });

        return res.send({_id : user._id , email : user.email, role : user.role});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

async function findUserByEmail(email){
    const user = await User.findOne({ email : email.toLowerCase() });
    return user;
}

async function validatePassword(pass1, pass2){
    const result = await bcrypt.compare(pass1, pass2);
    return result;
}


module.exports = router;