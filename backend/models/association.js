const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { string } = require('@hapi/joi');

const associationSchema = new mongoose.Schema({
    raisonSocial: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        lowercase: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    webSite: {
        type: String,
        trim: true,
        lowercase: true
    },
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
    }),
    description: {
        type: String,
    },
    logo: {
        type: String,
        trim: true,
    },
    tip: new mongoose.Schema({
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
        },
        photo: {
            type: String,
            trim: true,
        }
    }),
    userId : {
        type : mongoose.Schema.Types.ObjectId
    },
    collaborationDate: {
        type: Date
    },
    creationDate: {
        type: Date
    }
}, { timestamps: true });


const Association = mongoose.model('Association', associationSchema);

function validate(association) {
    const schema = Joi.object({
        raisonSocial: Joi.string()
            .required()
            .min(1),

        name: Joi.string()
            .required(),

        email: Joi.string()
            .required(),

        password: Joi.string()
            .required()
            .min(6)
            .pattern(/^[a-zA-Z0-9]{3,30}$/),
            
        repeat_password: Joi.string()
            .optional(),

        address: Joi.string()
            .optional()
            .allow(''),

        city: Joi.string()
            .required(),

        webSite: Joi.string()
            .optional()
            .allow(''),

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

        description: Joi.string()
            .optional()
            .allow(''),

        logo: Joi.string()
            .optional()
            .empty()
            .allow(''),

        tip: Joi.object({
            fullname: Joi.string()
                .required(),

            email: Joi.string()
                .required(),

            phone: Joi.string()
                .required(),

            photo: Joi.string()
                .optional()
                .empty()
                .allow(''),
        }),

        collaborationDate: Joi.date()
            .optional()
            .allow(''),

        creationDate: Joi.date()
            .optional()
            .allow(''),
    });

    return schema.validate(association);
}

function validateUpdateBody(association) {
    const schema = Joi.object({
        raisonSocial: Joi.string()
            .required()
            .min(1),

        name: Joi.string()
            .required(),

        address: Joi.string()
            .optional()
            .allow(''),

        city: Joi.string()
            .required(),

        webSite: Joi.string()
            .optional()
            .allow(''),

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

        description: Joi.string()
            .optional()
            .allow(''),

        tip: Joi.object({
            fullname: Joi.string()
                .required(),

            email: Joi.string()
                .required(),

            phone: Joi.string()
                .required(),
        }),

        collaborationDate: Joi.date()
            .optional()
            .allow(''),

        creationDate: Joi.date()
            .optional()
            .allow(''),
    });

    return schema.validate(association);
}

function validateUpdatePhotoBody(association) {
    const schema = Joi.object({
        photo: Joi.string()
            .required(),
        description: Joi.string()
            .required()
            .valid('AssociationLogo', 'TipPhoto')
    });

    return schema.validate(association);
}

function validateUpdatePassword(association) {
    const schema = Joi.object({
        password: Joi.string()
            .required()
    });

    return schema.validate(association);
}

module.exports.Association = Association;
module.exports.validate = validate;
module.exports.validateUpdateBody = validateUpdateBody;
module.exports.validateUpdatePhotoBody = validateUpdatePhotoBody;
module.exports.validateUpdatePassword = validateUpdatePassword;