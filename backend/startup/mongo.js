const mongoose = require('mongoose');
const config = require('config');
const bcrypt = require('bcrypt');
const { User } = require("../models/user");
const account = require("../services/account");

module.exports = function(){
    const db = config.get('db');

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex : true,
        retryWrites: false})
    .then(() => {
        console.log(`Connected to ${db} ...`);
        initUser();
    })
}

async function initUser() {
    try {
        await account.add('admin@admin.com', 'admin', 'admin')
    } catch (error) {
        console.log('User already exist');
    }

}

