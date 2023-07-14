import express, {RequestHandler} from 'express';
import { createRequest, deleteRequest, getRequests, updateRequest } from '../controllers/request';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', getRequests);
router.post('/', auth, createRequest);
router.delete('/', auth, deleteRequest);
router.patch('/:id', updateRequest);

export default router;  