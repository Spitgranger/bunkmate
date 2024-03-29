import express from 'express';
import auth from '../middleware/auth.js';
import { makePost, getPost, makeComment, deletePost, likePost, deleteComment } from '../controllers/mediaPost.js';

const router = express.Router();

router.post('/', auth, makePost);
router.get('/', auth, getPost);
router.patch('/:id/commentPost', auth, makeComment);
router.patch('/:id/likepost', auth, likePost);
router.delete('/:id', auth, deletePost);
router.delete('/:id/comment', auth, deleteComment);
export default router;