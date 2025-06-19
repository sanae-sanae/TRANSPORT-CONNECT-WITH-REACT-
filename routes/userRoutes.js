import express from 'express';
import { getMe, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/me', getMe);
router.put('/profile', updateProfile);

export default router;