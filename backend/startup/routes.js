const bodyParser = require("body-parser");
const express = require('express');
const user = require('../routes/user');
const signIn = require('../routes/sign-in');
const signOut = require('../routes/sign-out');
const associations = require('../routes/association');
const companies = require('../routes/company');
const jobs = require('../routes/job');
const passworks = require('../routes/passwork');
const young = require('../routes/young');
const stats = require('../routes/stats');
const documents = require('../routes/document');
const notifications = require('../routes/notification');


module.exports = function(app){
    app.use(bodyParser.json({limit: '3mb'}));
    app.use(bodyParser.urlencoded({limit: '3mb', extended: true}));
    app.use(express.json());
    app.use('/api/users', user);
    app.use('/api/signin', signIn);
    app.use('/api/signout', signOut);
    app.use('/api/associations', associations);
    app.use('/api/companies', companies);
    app.use('/api/jobs', jobs);
    app.use('/api/passworks', passworks);
    app.use('/api/young', young);
    app.use('/api/stats', stats);
    app.use('/api/documents', documents);
    app.use('/api/notifications', notifications);
}