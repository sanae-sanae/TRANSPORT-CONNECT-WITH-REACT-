import express from 'express';
import {
  getDashboardStats,
  getPlatformMetrics,
  toggleUserVerification,
  getAllUsers,
  deleteAnnouncement,
  getAllAnnouncements
} from '../controllers/adminController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate, authorize(['admin']));

router.get('/dashboard', getDashboardStats);
router.get('/metrics', getPlatformMetrics);
router.put('/users/:userId/verify', toggleUserVerification);
router.get('/users', getAllUsers);
router.delete('/announcements/:id', deleteAnnouncement);
router.get('/announcements', getAllAnnouncements);

export default router;