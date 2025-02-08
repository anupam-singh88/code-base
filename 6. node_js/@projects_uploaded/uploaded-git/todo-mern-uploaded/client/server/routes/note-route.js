const express = require('express');
const router = express.Router();
const { saveNoteController, getSingleNoteController, getAllNoteController, updateNoteController, deleteNoteController } = require('../controllers/note-controller');

//* route to save note to db
router.post('/savenote', saveNoteController)

//* route to get single note from the db
router.get('/getnote/:id', getSingleNoteController)

//* route to get all notes from the db
router.get('/getnote', getAllNoteController)

//* route to update note
router.put('/updatenote/:id', updateNoteController)

//* route to delete note
router.delete('/deletenote/:id', deleteNoteController)

//router-another-routes

router.get('/add', (req, res) => {
    // console.log(req.body)
    // res.send(req.body);
    res.json({
        message: 'another route'
    })
})
router.get('/', (req, res) => {
    // console.log(req.body)
    // res.send(req.body);
    res.json({
        message: 'Welcome to our API'
    })
})

module.exports = router