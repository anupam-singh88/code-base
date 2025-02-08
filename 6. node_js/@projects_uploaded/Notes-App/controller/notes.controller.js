import Notes from '../models/Notes.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { createApiResponse } from '../utils/ApiResponse.js';
import { createBadRequestError } from '../errors/bad-request-error.js';

const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json(createBadRequestError('Title and Content are required'))
    }
    try {
        const newNote = new Notes({
            title,
            content,
            user: req.user?._id
        })

        const createdNote = await newNote.save();

        if (!createdNote) {
            res.status(400).json(createBadRequestError('Note creation failed'))
        }

        return res.status(201).json(
            createApiResponse(201, createdNote, 'Note created successfully')

        )
    } catch (error) {
        res.status(500).json(createApiResponse(500, 'Server Error', error.message))
    }
})

const getNotes = asyncHandler(async (req, res) => {

    const notes = await Notes.find({ user: req.user?._id });
    // const notes = await Notes.find({ user: req.user?._id }).populate('user', 'username email'); 

    if (!notes) {
        res.status(400).json(createBadRequestError('No notes found'))
    }

    return res.status(200).json(
        createApiResponse(200, notes, 'Notes fetched successfully')
    )
})

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Notes.find();
    if (!notes) {
        res.status(400).json(createBadRequestError('No notes found'))
    }

    return res.status(200).json(
        createApiResponse(200, notes, 'Notes fetched successfully')
    )
})

const getSpecificNote = asyncHandler(async (req, res) => {
    const note = await Notes.findById(req.params.id);

    if (!note) {
        return res.status(400).json(createBadRequestError('Note not found'))
    }

    return res.status(200).json(
        createApiResponse(200, note, 'Note fetched successfully')
    )
});

const updateNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json(createBadRequestError('Title and Content are required'))
    }

    const note = await Notes.findById(req.params.id);

    if (!note) {
        return res.status(400).json(createBadRequestError('Note not found'))
    }

    note.title = title;
    note.content = content;

    const updatedNote = await note.save();

    return res.status(200).json(
        createApiResponse(200, updatedNote, 'Note updated successfully')
    )
});


const deleteNote = asyncHandler(async (req, res) => {
    const note = await Notes.findById(req.params.id);

    if (!note) {
        return res.status(400).json(createBadRequestError('Note not found'))
    }

    await Notes.findByIdAndDelete(req.params.id);

    return res.status(200).json(
        createApiResponse(200, {}, 'Note deleted successfully')
    )
});

export { createNote, getNotes, getAllNotes, deleteNote, getSpecificNote, updateNote };