const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Notes = model('note', noteSchema);

module.exports = Notes