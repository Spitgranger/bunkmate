import express from 'express';
import { signin, signup } from '../controllers/users'
import {validateLoginForm} from "../middleware/validateForm";
import {rateLimiter} from "../middleware/rateLimiter";

const router = express.Router();

router.post('/signin', rateLimiter, validateLoginForm, signin);
router.post('/signup', rateLimiter, validateLoginForm, signup);
export default router;  