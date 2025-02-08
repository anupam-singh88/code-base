const Note = require('../models/notes')

const saveNoteController = async (req, res) => {
    const { content } = req.body;
    let data = await Note.create({
        content
    })
    res.send(data)
}
const getSingleNoteController = async (req, res) => {
    const noteId = req.params.id;
    const note = await Note.findById(noteId);
    res.send(note);

}

const getAllNoteController = async (req, res) => {
    const note = await Note.find({});
    res.send(note);

}
const updateNoteController = async (req, res) => {
    const { content } = req.body;
    let data = await Note.findByIdAndUpdate(req.params.id, { $set: { content: content } }, { new: true })
    res.send(data)
}
const deleteNoteController = async (req, res) => {
    let data = await Note.findByIdAndDelete(req.params.id)
    res.send(data)
}
module.exports = { saveNoteController, getSingleNoteController, getAllNoteController, updateNoteController, deleteNoteController }