import express from 'express';
import {
  register,
  verifyEmail,
  login,
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;