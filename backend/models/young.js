const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { YoungInfoSchema, YoungInfoValidateSchema } = require('./young_info');
const { YoungSkillsSchema, YoungSkillsValidateSchema } = require('./young_skills_assessment');
const { YoungCapacitySchema, YoungCapacityValidateSchema } = require('./young_capacity_building');
const { YoungPassworkSchema, YoungPassworkValidateSchema } = require('./young_passwork');
const { YoungInsertionSchema, YoungInsertionValidateSchema, YoungTrackingValidateSchema } = require('./young_insertion');

const youngSchema = new mongoose.Schema({
    personal_info: YoungInfoSchema,
    skills_assessment: YoungSkillsSchema,
    capacity_building : YoungCapacitySchema,
    passwork : YoungPassworkSchema,
    insertion : YoungInsertionSchema,
    status: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type : String
    },
    updatedBy : {
        type : String
    }
}, { timestamps: true });


const Young = mongoose.model('Young', youngSchema);

function validate(young) {
    const schema = Joi.object({
        personal_info: YoungInfoValidateSchema.required(),
        skills_assessment: YoungSkillsValidateSchema.required(),
        capacity_building: YoungCapacityValidateSchema.required(),
        passwork: YoungPassworkValidateSchema.required(),
        insertion : YoungInsertionValidateSchema.required()
    });

    return schema.validate(young);
}

function validateInsertion(insertion) {
    const schema = YoungTrackingValidateSchema

    return schema.validate(insertion);
}

module.exports.Young = Young;
module.exports.validate = validate;
module.exports.validateInsertion = validateInsertion;