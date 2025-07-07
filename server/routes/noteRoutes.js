import express from 'express';
import {
  addNote,
  getUserNotes,
  updateNote,
  deleteNote
} from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addNote);
router.get('/', protect, getUserNotes);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

export default router;
