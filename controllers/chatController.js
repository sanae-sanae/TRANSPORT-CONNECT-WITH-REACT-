import Message from '../models/Message.js';
import Announcement from '../models/Announcement.js';
import User from '../models/User.js';
export const saveMessage = async (io, socket, data) => {
  try {
    const { announcementId, receiverId, content } = data;
    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return socket.emit('error', 'Announcement not found');
    }
    
    const validParticipants = [
      announcement.driver.toString(),
      ...announcement.requests
        .map(req => req.shipper.toString())
    ];
    
    if (!validParticipants.includes(socket.user.id) || 
        !validParticipants.includes(receiverId)) {
      return socket.emit('error', 'Unauthorized chat participant');
    }
    const message = new Message({
      announcement: announcementId,
      sender: socket.user.id,
      receiver: receiverId,
      content,
    });

    const savedMessage = await message.save();
    const populatedMessage = await Message.populate(savedMessage, {
      path: 'sender',
      select: 'firstName lastName'
    });
    io.to(announcementId).emit('newMessage', populatedMessage);
  } catch (err) {
    console.error('Error saving message:', err);
    socket.emit('error', 'Failed to send message');
  }
};
export const getChatHistory = async (req, res, next) => {
  try {
    const { announcementId } = req.params;
    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    const validParticipants = [
      announcement.driver.toString(),
      ...announcement.requests
        .map(req => req.shipper.toString())
    ];
    
    if (!validParticipants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized access to chat' });
    }
    const messages = await Message.find({ announcement: announcementId })
      .populate('sender', 'firstName lastName')
      .sort('createdAt');

    res.json(messages);
  } catch (err) {
    next(err);
  }
};
export const getChatParticipants = async (req, res, next) => {
  try {
    const { announcementId } = req.params;
    
    const announcement = await Announcement.findById(announcementId)
      .populate('driver', 'firstName lastName id')
      .populate({
        path: 'requests',
        populate: {
          path: 'shipper',
          select: 'firstName lastName id'
        }
      });
    
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    
    const participants = [
      {
        id: announcement.driver._id,
        name: `${announcement.driver.firstName} ${announcement.driver.lastName}`,
        role: 'driver'
      },
      ...announcement.requests.map(request => ({
        id: request.shipper._id,
        name: `${request.shipper.firstName} ${request.shipper.lastName}`,
        role: 'shipper'
      }))
    ];
    
    res.json(participants);
  } catch (err) {
    next(err);
  }
};