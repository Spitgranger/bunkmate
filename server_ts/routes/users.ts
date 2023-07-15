import express from 'express';
import {signin, signout, signup} from '../controllers/users'
import {validateLoginForm} from "../middleware/validateForm";
import {rateLimiter} from "../middleware/rateLimiter";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/signin', rateLimiter, validateLoginForm, signin);
router.post('/signup', rateLimiter, validateLoginForm, signup);
router.get('/logout', auth, signout);
export default router;  