// 🔧 BACKEND ROUTES for DevStats (Express + Mongoose)
import express from 'express';
import Project from '../models/Project.js';
import Note from '../models/Note.js';

import Achievement from '../models/Achievement.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET total projects count
router.get('/projects/count', protect, async (req, res) => {
  try {
    console.log('Decoded User ID:', req.user.id); // ✅ Add this
    const count = await Project.countDocuments({ userId: req.user.id });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project count' });
  }
});


// ✅ GET total notes count
router.get('/notes/count', protect, async (req, res) => {
  try {
    const count = await Note.countDocuments({ userId: req.user.id });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch note count' });
  }
});



// ✅ GET latest achievement
router.get('/achievements/latest', protect, async (req, res) => {
  try {
    const latest = await Achievement.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(latest || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest achievement' });
  }
});

export default router;
