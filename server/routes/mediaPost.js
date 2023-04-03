import express from 'express';
import auth from '../middleware/auth.js';
import { makePost, getPost, makeComment } from '../controllers/mediaPost.js';

const router = express.Router();

router.post('/', auth, makePost);
router.get('/', auth, getPost);
router.patch('/:id/commentPost', auth, makeComment);
export default router;