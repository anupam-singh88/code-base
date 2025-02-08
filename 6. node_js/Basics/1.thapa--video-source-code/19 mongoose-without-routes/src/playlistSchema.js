const mongoose = require("mongoose");

//schema : a mongoose schema define the structure of the document , default values , validators, etc..
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique:true,
        //* mongoose validations
        // lowercase: true
        // uppercase: true
        trim: true,
        minlength: [10, "min 10 length required"],
        // maxlength:
        //match
    },
    ctype: {
        type: String,
        required: true,
        lowercase: true,
        //any one will be allowed
        enum: ["frontend", "backend", "database"],
    },
    videos: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw Error("videos must be positive");
            }
        },
    },
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.playlistSchema = playlistSchema;
