import mongoose, { Schema, model } from "mongoose";

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

}, {
    timestamps: true,
})

const Notes = model("Notes", notesSchema);

export default Notes;