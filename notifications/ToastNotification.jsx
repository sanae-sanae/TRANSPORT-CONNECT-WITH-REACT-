import React, { useEffect } from 'react';

const ToastNotification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1000] animate-fadeInUp">
      <div className={`p-4 rounded-xl shadow-xl border-l-4 ${
        notification.type === 'request' ? 'bg-indigo-50 border-indigo-500' :
        notification.type === 'message' ? 'bg-blue-50 border-blue-500' :
        notification.type === 'payment' ? 'bg-green-50 border-green-500' :
        'bg-gray-50 border-gray-500'
      }`}>
        <div className="flex items-start">
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">
              {notification.type === 'request' && 'Nouvelle demande'}
              {notification.type === 'message' && 'Nouveau message'}
              {notification.type === 'payment' && 'Paiement confirmé'}
              {notification.type === 'system' && 'Notification système'}
            </h4>
            <p className="text-gray-700">{notification.message}</p>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              notification.type === 'request' ? 'bg-indigo-500' :
              notification.type === 'message' ? 'bg-blue-500' :
              notification.type === 'payment' ? 'bg-green-500' :
              'bg-gray-500'
            } animate-progress`}
          />
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;