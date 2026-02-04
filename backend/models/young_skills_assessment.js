const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports.YoungSkillsSchema = new mongoose.Schema({
    level_of_study: new mongoose.Schema({
        level: {
            type: String
        },
        description: {
            type: String
        }
    }, { _id: false }),
    languages: {
        type: [String],
    },
    languages_comment: {
        type: String,
    },
    professional_training: [new mongoose.Schema({
        type_formation: {
            type: String
        },
        specialty: {
            type: String
        },
        institution: {
            type: String
        },
        start_date: {
            type: Date
        },
        end_date: {
            type: Date
        },
        cetificate: {
            type: String
        },
        comment: {
            type: String
        }
    }, { _id: false })],
    professional_experience: [new mongoose.Schema({
        genre: {
            type: String
        },
        institution: {
            type: String
        },
        start_date: {
            type: Date
        },
        end_date: {
            type: Date
        },
        duration: {
            type: String
        },
        function: {
            type: String
        },
        comment: {
            type: String
        }
    }, { _id: false })],
    tip_interview: new mongoose.Schema({
        date: {
            type: Date
        },
        comment: {
            type: String
        }
    }, { _id: false }),
    skills: new mongoose.Schema({
        hard_skills: {
            type: [String]
        },
        soft_skills: {
            type: [String]
        },
        life_skills: {
            type: [String]
        }
    }, { _id: false }),
    rate : {
        type : Number
    }
}, { _id: false });

module.exports.YoungSkillsValidateSchema = Joi.object({
    level_of_study: Joi.object({
        level: Joi.string().optional().allow(""),
        description: Joi.string().optional().allow("")
    }),

    languages: Joi.array().optional().empty(),
    languages_comment: Joi.string().optional().allow(""),

    professional_training: Joi.array().items(
        Joi.object({
            type_formation: Joi.string().optional().allow(""),
            specialty: Joi.string().optional().allow(""),
            institution: Joi.string().optional().allow(""),
            start_date: Joi.date().optional().allow(""),
            end_date: Joi.date().optional().allow(""),
            cetificate: Joi.string().optional().allow(""),
            comment: Joi.string().optional().allow("")
        })
    ),

    professional_experience: Joi.array().items(
        Joi.object({
            genre: Joi.string().optional().allow(""),
            institution: Joi.string().optional().allow(""),
            start_date: Joi.date().optional().allow(""),
            end_date: Joi.date().optional().allow(""),
            duration: Joi.string().optional().allow(""),
            function: Joi.string().optional().allow(""),
            comment: Joi.string().optional().allow("")
        })
    ),

    tip_interview: Joi.object({
        date: Joi.date().optional().allow(""),
        comment: Joi.string().optional().allow("")
    }),

    skills: Joi.object({
        hard_skills: Joi.array(),
        soft_skills: Joi.array(),
        life_skills: Joi.array(),
    }),
});
