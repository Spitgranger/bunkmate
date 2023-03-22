import express from 'express';
import { createRequest, deleteRequest, getRequests } from '../controllers/request.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRequests);
router.post('/', auth, createRequest);
router.delete('/', auth, deleteRequest);

export default router;  