const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports.YoungCapacitySchema = new mongoose.Schema({
    training: [new mongoose.Schema({
        title: {
            type: String
        },
        start_date: {
            type: Date
        },
        status: {
            type: String
        },
        comment: {
            type: String
        }
    }, { _id: false })],
    comment: {
        type: String
    },
    rate : {
        type : Number
    }
}, { _id: false });




module.exports.YoungCapacityValidateSchema = Joi.object({
    training: Joi.array().items(
        Joi.object({
            title: Joi.string().optional()
                .allow(""),

            start_date: Joi.date().optional().allow(""),

            status: Joi.string().optional().allow(""),

            comment: Joi.string().optional().allow(""),
        }),
    ),

    comment: Joi.string().optional().allow("")
});

