const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const jobSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    status : {
        type : String,
        default : 'active'
    },
    activity_area: {
        type: String,
    },
    type_contrat: {
        type: String
    },
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' 
    },
    sharedWith: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Association' 
    }]
}, { timestamps: true });


const Job = mongoose.model('Job', jobSchema);

function validate(job) {
    const schema = Joi.object({
        title: Joi.string()
            .required(),

        company: Joi.string()
            .optional()
            .empty()
            .allow(null),

        location: Joi.string()
            .optional()
            .empty()
            .allow(''),

        activity_area: Joi.string()
            .optional()
            .empty()
            .allow(''),

        description: Joi.string()
            .optional()
            .empty()
            .allow(''),

        type_contrat: Joi.string()
            .optional()
            .empty()
            .allow(''),

        sharedWith: Joi.array()
            .optional()
            .empty(),
    });

    return schema.validate(job);
}

module.exports.Job = Job;
module.exports.validate = validate;