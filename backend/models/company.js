const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        trim: true,
    },
    activity_area: {
        type: String,
        required: true,
    },
    colaboration_type: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    person_contacted: new mongoose.Schema({
        fullname: {
            type: String,
            required: true,
            default: null
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        }
    }),
    socialMedia: new mongoose.Schema({
        facebook: {
            type: String,
            default: null
        },
        instagram: {
            type: String,
            default: null
        },
        linkedIn: {
            type: String,
            default: null
        },
        twitter: {
            type: String,
            default: null
        }
    }, { _id: false })
}, { timestamps: true });


const Company = mongoose.model('Company', companySchema);

function validate(company) {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .min(1),

        address: Joi.string()
            .optional()
            .allow(''),

        city: Joi.string()
            .required(),

        activity_area: Joi.string()
            .required(),

        email: Joi.string()
            .required(),

        logo: Joi.string()
            .optional()
            .empty()
            .allow(''),

        password: Joi.string()
            .required()
            .min(6)
            .pattern(/^[a-zA-Z0-9]{3,30}$/),

        repeat_password: Joi.string()
            .optional()
            .allow(''),

        person_contacted: Joi.object({
            fullname: Joi.string()
                .required(),

            email: Joi.string()
                .required(),

            phone: Joi.string()
                .required(),
        }),

        socialMedia: Joi.object({
            facebook: Joi.string()
                .optional()
                .allow(''),

            instagram: Joi.string()
                .optional()
                .allow(''),

            linkedIn: Joi.string()
                .optional()
                .allow(''),

            twitter: Joi.string()
                .optional()
                .allow(''),
        }),
    });

    return schema.validate(company);
}

function validateUpdatePassword(association) {
    const schema = Joi.object({
        password: Joi.string()
            .required()
    });

    return schema.validate(association);
}

function validateUpdateLogo(company) {
    const schema = Joi.object({
        logo: Joi.string()
            .required(),
    });

    return schema.validate(company);
}

function validateUpdateColaboration(company) {
    const schema = Joi.object({
        colaboration_type: Joi.string()
            .required(),
    });

    return schema.validate(company);
}

module.exports.Company = Company;
module.exports.validate = validate;
module.exports.validateUpdatePassword = validateUpdatePassword;
module.exports.validateUpdateLogo = validateUpdateLogo;
module.exports.validateUpdateColaboration = validateUpdateColaboration;