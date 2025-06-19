import express from 'express';
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  getMyAnnouncements,
  updateAnnouncementStatus
} from '../controllers/announcementController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { checkOwnership } from '../middlewares/roleMiddleware.js';
import Announcement from '../models/Announcement.js';

const router = express.Router();

router.post('/', authenticate, createAnnouncement);
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);
router.get('/my/announcements', authenticate, getMyAnnouncements);
router.put('/:id/status', 
  authenticate, 
  checkOwnership(Announcement, 'driver'), 
  updateAnnouncementStatus
);

export default router;