import { saveMessage } from '../controllers/chatController.js';
import { logger } from '../utils/logger.js';
export const initSocket = (io) => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user.id}`);
    socket.on('joinAnnouncement', (announcementId) => {
      socket.join(announcementId);
      logger.info(`User ${socket.user.id} joined room: ${announcementId}`);
    });
    socket.on('sendMessage', (data) => {
      saveMessage(io, socket, data);
    });
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user.id}`);
    });
    socket.on('error', (error) => {
      logger.error(`Socket error: ${error.message}`);
    });
  });
  const broadcastNotification = (userId, message) => {
    io.to(`user_${userId}`).emit('notification', message);
  };
  
  return {
    broadcastNotification
  };
};