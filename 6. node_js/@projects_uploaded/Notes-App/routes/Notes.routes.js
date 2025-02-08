import { Router } from "express";

import * as notesController from "../controller/notes.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/').get(verifyJWT, notesController.getNotes).post(verifyJWT, notesController.createNote);

router.route('/all').get(verifyJWT, notesController.getAllNotes);

router.route('/:id').get(verifyJWT, notesController.getSpecificNote).put(verifyJWT, notesController.updateNote).delete(verifyJWT, notesController.deleteNote);


export default router;