const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        // unique: true
    },
    passwordVal: {
        type: String,
        required: true
    },
    genderValue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const RegistrationModel = new mongoose.model('RegData', RegistrationSchema)

module.exports = RegistrationModel;