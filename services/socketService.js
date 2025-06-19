import { saveMessage } from '../controllers/chatController.js';
import { logger } from '../utils/logger.js';

// Initialize Socket.IO
export const initSocket = (io) => {
  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user.id}`);
    
    // Join announcement room
    socket.on('joinAnnouncement', (announcementId) => {
      socket.join(announcementId);
      logger.info(`User ${socket.user.id} joined room: ${announcementId}`);
    });

    // Handle messages
    socket.on('sendMessage', (data) => {
      saveMessage(io, socket, data);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user.id}`);
    });
    
    // Error handling
    socket.on('error', (error) => {
      logger.error(`Socket error: ${error.message}`);
    });
  });
  
  // Broadcast system notifications
  const broadcastNotification = (userId, message) => {
    io.to(`user_${userId}`).emit('notification', message);
  };
  
  return {
    broadcastNotification
  };
};