import express from 'express';
import { getUserUsernames, updateUserUsernames } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();


router.get('/get-usernames', verifyToken, getUserUsernames);
router.put('/update-usernames', verifyToken, updateUserUsernames);

export default router;
