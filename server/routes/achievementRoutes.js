import express from 'express';
import {
  createAchievement,
  getAchievements,
  updateAchievement,
  deleteAchievement
} from '../controllers/achievementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all achievements for a logged-in user
router.get('/', protect, getAchievements);

// POST a new achievement
router.post('/', protect, createAchievement);

// PUT (update) an existing achievement by ID
router.put('/:id', protect, updateAchievement);

// DELETE an achievement by ID
router.delete('/:id', protect, deleteAchievement);

export default router;
