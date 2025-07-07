import express from 'express';
import { askVault } from '../controllers/askVaultController.js';

const router = express.Router();

// Route: POST /api/askvault
router.post('/', askVault);

export default router;
