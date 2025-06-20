import React, { useState } from 'react';
import Lottie from 'lottie-react';
import chatBubbleAnim from '../../assets/animations/chat-bubble.json';
import { 
  PaperAirplaneIcon, 
  EllipsisHorizontalIcon,
  HeartIcon,
  FaceSmileIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const ChatBubble = ({ message, isSender, timestamp, status }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div 
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4 group`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className={`relative max-w-[85%] lg:max-w-[70%]`}>
        {!isSender && (
          <div className="absolute -left-2 top-0 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-6 h-6" />
          </div>
        )}
        
        <div 
          className={`relative rounded-3xl px-5 py-3 shadow-lg ${
            isSender 
              ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-br-none' 
              : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
          }`}
        >
          {/* Animation de bulle pour les nouveaux messages */}
          {status === 'new' && !isSender && (
            <div className="absolute -top-3 -left-3">
              <Lottie 
                animationData={chatBubbleAnim} 
                loop={false} 
                className="w-16 h-16" 
              />
            </div>
          )}
          
          <p className="text-lg whitespace-pre-wrap break-words">{message}</p>
          
          <div className={`flex items-center mt-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
            <span className={`text-xs ${isSender ? 'text-indigo-200' : 'text-gray-500'}`}>
              {formatTime(timestamp)}
            </span>
            
            {isSender && (
              <span className="ml-2">
                {status === 'sent' && <ClockIcon className="h-3 w-3 text-indigo-300" />}
                {status === 'delivered' && <CheckCircleIcon className="h-3 w-3 text-indigo-300" />}
                {status === 'read' && <CheckCircleIcon className="h-3 w-3 text-green-400" />}
              </span>
            )}
          </div>
        </div>
        
        {/* Options de message (apparaissent au survol) */}
        {showOptions && (
          <div 
            className={`absolute flex space-x-1 ${
              isSender 
                ? '-left-14 top-1/2 transform -translate-y-1/2' 
                : '-right-14 top-1/2 transform -translate-y-1/2'
            } bg-white rounded-full shadow-lg p-1 border border-gray-200`}
          >
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <HeartIcon 
                className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-500'}`} 
              />
            </button>
            
            <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <EllipsisHorizontalIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;