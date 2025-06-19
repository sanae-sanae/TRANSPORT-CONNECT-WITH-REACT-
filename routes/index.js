import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import announcementRoutes from './announcementRoutes.js';
import requestRoutes from './requestRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import adminRoutes from './adminRoutes.js';
import chatRoutes from './chatRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/announcements', announcementRoutes);
router.use('/requests', requestRoutes);
router.use('/reviews', reviewRoutes);
router.use('/admin', adminRoutes);
router.use('/chat', chatRoutes);

export default router;