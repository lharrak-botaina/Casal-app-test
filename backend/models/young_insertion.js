const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports.YoungInsertionSchema = new mongoose.Schema({
    list: [new mongoose.Schema({
        tracking_before: [new mongoose.Schema({
            interview_date: {
                type: Date
            },
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company'
            },
            companyName: {
                type: String
            },
            job_position: {
                type: String
            },
            comment: {
                type: String
            }
        }, { _id: false })],
        tracking_after: new mongoose.Schema({
            contract_type: {
                type: String
            },
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company'
            },
            companyName: {
                type: String
            },
            isJobExists: {
                type: Boolean
            },
            jobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Job'
            },
            jobName: {
                type: String,
                default: ""
            },
            start_date: {
                type: Date
            },
            end_date: {
                type: Date
            },
            category: {
                type: String
            },
            insertion_type : {
                type : String
            },
            salary: {
                type: String
            },
            function: {
                type: String
            },
            function_type: {
                type: String
            },
            duration: {
                type: String
            },
            cnss: {
                type: Boolean
            },
            justificative_type: {
                type: String
            },
            justification: {
                type: String
            }
        }, { _id: false })
    }, { _id: false })],
    rate: {
        type: Number
    }
}, { _id: false });
;

const YoungTrackingValidateSchema = Joi.object({
    tracking_before: Joi.array().items(
        Joi.object({
            interview_date: Joi.date().optional().allow(""),
            companyId: Joi.string().optional().allow(null),
            companyName: Joi.string().optional().allow(""),
            job_position: Joi.string().optional().allow(""),
            comment: Joi.string().optional().allow("")
        })
    ),
    tracking_after: Joi.object({
        contract_type: Joi.string().optional().allow(""),
        companyId: Joi.string().optional().allow(null),
        companyName: Joi.string().optional().allow(""),
        isJobExists: Joi.bool().optional(),
        jobId: Joi.string().optional().allow(null),
        jobName: Joi.string().optional().allow(""),
        insertion_type: Joi.string().optional().allow(""),
        start_date: Joi.date().optional().allow(""),
        end_date: Joi.date().optional().allow(""),
        category: Joi.string().optional().allow(""),
        salary: Joi.string().optional().allow(""),
        function_type: Joi.string().optional().allow(""),
        duration: Joi.string().optional().allow(""),
        function: Joi.string().optional().allow(""),
        cnss: Joi.bool().optional(),
        justificative_type: Joi.string().optional().allow(""),
        justification: Joi.string().optional().allow("")
    })
})

module.exports.YoungInsertionValidateSchema = Joi.object({
    list: Joi.array().items(YoungTrackingValidateSchema)
});

module.exports.YoungTrackingValidateSchema = YoungTrackingValidateSchema;



