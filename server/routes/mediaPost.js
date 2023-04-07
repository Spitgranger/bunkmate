import express from 'express';
import auth from '../middleware/auth.js';
import { makePost, getPost, makeComment, deletePost } from '../controllers/mediaPost.js';

const router = express.Router();

router.post('/', auth, makePost);
router.get('/', auth, getPost);
router.patch('/:id/commentPost', auth, makeComment);
router.delete('/:id', auth, deletePost);
export default router;