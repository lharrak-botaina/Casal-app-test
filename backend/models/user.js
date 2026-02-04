const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50,
        trim : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required  : true,
        minlength : 4
    },
    role : {
        type :String,
        required : true,
        minlength : 4,
        trim : true,
        lowercase : true
    }
},{ timestamps: true });

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ role : this.role }, config.get('jwtPrivateKey'), { subject : this._id.toString()});
    return token;
}

const User = mongoose.model('User', userSchema);

function validate(user){
    const schema = Joi.object({
        email : Joi.string()
                  .required()
                  .min(3)
                  .max(50),
        password: Joi.string()
                     .required()
                     .min(4)
                     .pattern(/^[a-zA-Z0-9]{3,30}$/),
           
        role : Joi.string()
                  .required()
                  .valid('admin')
    });

    return schema.validate(user);
}

function createCsrfToken() {
    return crypto.randomBytes(32).toString('hex');
}


module.exports.User = User;
module.exports.validate = validate;
module.exports.createCsrfToken = createCsrfToken;