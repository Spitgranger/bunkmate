import express from 'express';
import auth from '../middleware/auth.js';
import { makePost, getPost } from '../controllers/mediaPost.js';

const router = express.Router();

router.post('/', auth, makePost);
router.get('/', getPost);

export default router;