const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports.YoungInfoSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    gendre: {
        type: String,
    },
    birth_date: {
        type: Date
    },
    inscription_date: {
        type: Date
    },
    photo: {
        type: String
    },
    phone: {
        type: String
    },
    cin_id: {
        type: String
    },
    cnss_id: {
        type: String
    },
    civil_status: {
        type: String
    },
    kids_nbr: {
        type: Number,
        default: 0
    },
    housing: {
        type: String
    },
    nationality: {
        type: String
    },
    nationality_comment: {
        type: String
    },
    people_in_charge_nbr: {
        type: Number,
        default: 0
    },
    current_function: {
        type: String
    },
    associative_activity: {
        type: String
    },
    hobbies: {
        type: [String]
    },
    connectedBy: {
        type: String
    },
    isPriority: {
        type: Boolean,
        default: false
    },
    physical_state: new mongoose.Schema({
        addiction: new mongoose.Schema({
            status: Boolean,
            description: String
        }, { _id: false }),
        handicap: new mongoose.Schema({
            status: Boolean,
            description: String
        }, { _id: false }),
        health_issue: new mongoose.Schema({
            status: Boolean,
            chronic_illness: String,
            ongoing_treatment: String
        }, { _id: false })
    }, { _id: false }),
    rate: {
        type: Number,
        default: 0
    }
}, { _id: false });

module.exports.YoungInfoValidateSchema = Joi.object({
    fullname: Joi.string().required(),

    address: Joi.string().optional().allow(""),

    city: Joi.string().optional().allow(""),

    gendre: Joi.string().optional().allow(""),

    birth_date: Joi.string().optional().allow(""),

    inscription_date: Joi.string().optional().allow(""),

    photo: Joi.string().optional().allow(""),

    phone: Joi.string().optional().allow(""),

    cin_id: Joi.string().optional().allow(""),

    cnss_id: Joi.string().optional().allow(""),

    civil_status: Joi.string().optional().allow(""),

    kids_nbr: Joi.number().optional(),

    housing: Joi.string().optional().allow(""),

    people_in_charge_nbr: Joi.number().optional(),

    current_function: Joi.string().optional().allow(""),

    associative_activity: Joi.string().optional().allow(""),

    hobbies: Joi.array().optional(),

    connectedBy: Joi.string().optional().allow(""),

    isPriority: Joi.boolean().optional(),

    nationality: Joi.string().optional().allow(""),
    
    nationality_comment: Joi.string().optional().allow(""),
    
    physical_state: Joi.object({
        addiction: Joi.object({
            status: Joi.boolean().optional(),
            description: Joi.string().optional().allow("")
        }).optional(),

        handicap: Joi.object({
            status: Joi.boolean().optional(),
            description: Joi.string().optional().allow("")
        }).optional(),

        health_issue: Joi.object({
            status: Joi.boolean().optional(),
            chronic_illness: Joi.string().optional().allow(""),
            ongoing_treatment: Joi.string().optional().allow("")
        }).optional()
    })
});