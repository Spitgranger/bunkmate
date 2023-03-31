import express from 'express';
import { createProfile, deleteProfile, getProfile, getProfiles } from '../controllers/profile.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getProfile);
router.post('/', auth, createProfile);
router.get('/:profiles', getProfiles);
router.delete('/', deleteProfile);

export default router;  