const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    document: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Document = mongoose.model('Document', documentSchema);

function validate(document) {
    const schema = Joi.object({
        name: Joi.string()
            .required(),

        document: Joi.string()
            .required(),
    });

    return schema.validate(document);
}

module.exports.Document = Document;
module.exports.validate = validate;