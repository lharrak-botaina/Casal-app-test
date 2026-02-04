const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const passworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    module: {
        type: String,
    },
    associations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Association'
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    training_center: new mongoose.Schema({
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
        }
    }, { _id: false }),

    nbr_beneficiaries: {
        type: Number,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    training_modules: {
        type: String,
    },
    training_planning: {
        type: String,
    },
    status: {
        type : String,
        default : 'active'
    }

}, { timestamps: true });


const Passwork = mongoose.model('Passwork', passworkSchema);

function validate(passwork) {
    const schema = Joi.object({
        title: Joi.string()
            .required(),

        module: Joi.string()
            .allow('')
            .optional(),

        company: Joi.string()
            .optional()
            .empty()
            .allow(null),

        associations: Joi.array()
            .optional()
            .empty(),

        training_center: Joi.object({
            name: Joi.string()
                .allow('')
                .optional(),

            address: Joi.string().allow('')
                .optional(),

            phone: Joi.string().allow('')
                .optional(),

            email: Joi.string().allow('')
                .optional(),
        })
            .optional(),

        nbr_beneficiaries: Joi.number()
            .allow('')
            .optional(),

        start_date: Joi.string()
            .allow('')
            .optional(),

        end_date: Joi.string()
            .allow('')
            .optional(),

        training_modules: Joi.string()
            .optional()
            .empty()
            .allow(''),

        training_planning: Joi.string()
            .optional()
            .allow('')
            .empty(),
    });

    return schema.validate(passwork);
}

module.exports.Passwork = Passwork;
module.exports.validate = validate;