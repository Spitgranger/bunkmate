import express from 'express';
import { createRequest, deleteRequest, getRequests, updateRequest } from '../controllers/request.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRequests);
router.post('/', auth, createRequest);
router.delete('/', auth, deleteRequest);
router.patch('/:id', updateRequest);

export default router;  