import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';
import bellAnimation from '../../assets/animations/bell-animation.json';
import ToastNotification from './ToastNotification';

const NotificationBell = ({ count = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [newNotification, setNewNotification] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && count > 0) {
        const types = ['request', 'message', 'payment', 'system'];
        const messages = [
          'Nouvelle demande de transport reçue',
          'Vous avez un nouveau message',
          'Paiement de 1,240 MAD confirmé',
          'Mise à jour système disponible'
        ];
        
        const type = types[Math.floor(Math.random() * types.length)];
        const message = messages[types.indexOf(type)];
        
        const notification = {
          id: Date.now(),
          type,
          message,
          time: 'À l\'instant',
          isNew: true
        };
        
        setNotifications(prev => [notification, ...prev]);
        setNewNotification(notification);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [count]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? {...n, isNew: false} : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, isNew: false})));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-indigo-100 transition-colors relative"
      >
        <Lottie 
          animationData={bellAnimation} 
          loop={false} 
          className="w-8 h-8" 
        />
        
        {count > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1 shadow">
            {count}
          </span>
        )}
      </button>
      
      {showToast && newNotification && (
        <ToastNotification 
          notification={newNotification} 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Notifications</h3>
            <button 
              onClick={markAllAsRead}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Tout marquer comme lu
            </button>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 hover:bg-indigo-50 transition-colors ${
                    notification.isNew ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${
                      notification.type === 'request' ? 'bg-indigo-100' :
                      notification.type === 'message' ? 'bg-blue-100' :
                      notification.type === 'payment' ? 'bg-green-100' :
                      'bg-gray-100'
                    }`}>
                      {notification.type === 'request' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                      {notification.type === 'message' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      )}
                      {notification.type === 'payment' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {notification.type === 'system' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        {notification.time}
                        {notification.isNew && (
                          <span className="ml-2 bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            Nouveau
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                <p className="text-gray-500">Aucune notification</p>
              </div>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="p-3 text-center border-t border-gray-200">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                Voir toutes les notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;