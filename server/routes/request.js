import express from 'express';
import { createRequest, getRequests } from '../controllers/request.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getRequests);
router.post('/', auth, createRequest);

export default router;  