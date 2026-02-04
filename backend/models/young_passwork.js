const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

module.exports.YoungPassworkSchema = new mongoose.Schema({
    trainings : [new mongoose.Schema({
        passwork_training: {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Passwork'
        },
        start_date: {
            type: Date
        },
        end_date: {
            type: Date
        },
        comment: {
            type: String
        }
    }, { _id: false })],
    rate : {
        type : Number
    }
}, { _id: false });

module.exports.YoungPassworkValidateSchema = Joi.object({
    trainings : Joi.array().items(
        Joi.object({
            passwork_training: Joi.string().optional().allow(null),
            start_date: Joi.date().optional().allow(""),
            end_date: Joi.date().optional().allow(""),
            comment: Joi.string().optional().allow("")
        })
    )
});


