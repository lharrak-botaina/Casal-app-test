const auth =  require('../middleware/auth');
const checkCsrfToken =  require('../middleware/csrf');
const express = require('express');
const router = express.Router();

router.post('/', [auth, checkCsrfToken], async(req, res) => {
    try {
        res.clearCookie("SESSIONID");

        res.clearCookie("XSRF-TOKEN");
    
        return res.send({ message : "You have successfully logged out "})

    } catch (error) {
        res.status(500).send(error.message); 
    }


});

module.exports = router;