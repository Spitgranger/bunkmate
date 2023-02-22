import express from 'express';
import { createProfile, getProfile } from '../controllers/profile.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getProfile);
router.post('/', auth, createProfile);

export default router;  