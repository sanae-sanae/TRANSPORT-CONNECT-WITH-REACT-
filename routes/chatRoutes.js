import express from 'express';
import {
  getChatHistory,
  getChatParticipants
} from '../controllers/chatController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:announcementId/history', authenticate, getChatHistory);
router.get('/:announcementId/participants', authenticate, getChatParticipants);

export default router;