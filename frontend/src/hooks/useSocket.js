import { useState, useEffect, useCallback, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import { useAnimation } from '../contexts/AnimationContext';

const useSocket = (namespace = '/') => {
  const { user } = useAuth();
  const { playAnimation } = useAnimation();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);
  useEffect(() => {
    if (!user) return;
    
    const socket = io(`${process.env.REACT_APP_API_URL}${namespace}`, {
      auth: { token: localStorage.getItem('authToken') },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 3000
    });
    
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      playAnimation('success', { duration: 1000 });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      playAnimation('error', { duration: 2000 });
    });

    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
      playAnimation('chat', { 
        duration: 3000,
        style: { bottom: '20px', right: '20px', width: '80px', height: '80px' }
      });
    });

    socket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      playAnimation('notification', { 
        duration: 3000,
        style: { top: '20px', right: '20px', width: '60px', height: '60px' }
      });
    });

    socket.on('error', (error) => {
      console.error('Erreur Socket:', error);
      playAnimation('error', { duration: 3000 });
    });

    return () => {
      socket.disconnect();
    };
  }, [user, namespace, playAnimation]);
  const sendMessage = useCallback((message) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('message', message);
      return true;
    }
    return false;
  }, [isConnected]);
  const sendNotification = useCallback((notification) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('notification', notification);
      return true;
    }
    return false;
  }, [isConnected]);
  const joinRoom = useCallback((roomId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('join-room', roomId);
      return true;
    }
    return false;
  }, [isConnected]);
  const leaveRoom = useCallback((roomId) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('leave-room', roomId);
      return true;
    }
    return false;
  }, [isConnected]);

  return {
    isConnected,
    messages,
    notifications,
    sendMessage,
    sendNotification,
    joinRoom,
    leaveRoom,
    socket: socketRef.current
  };
};

export default useSocket;