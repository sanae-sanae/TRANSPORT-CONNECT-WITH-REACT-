import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import { 
  PaperAirplaneIcon, 
  FaceSmileIcon, 
  PaperClipIcon,
  MicrophoneIcon,
  XMarkIcon,
  VideoCameraIcon,
  PhoneIcon,
  UserCircleIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';
import chatBubbleAnim from '../../assets/animations/chat-bubble.json';
import AnimatedEmoji from './AnimatedEmoji';

const ChatWindow = ({ conversation, onSendMessage, onClose }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  
  const emojis = ['😀', '😂', '😍', '👍', '👏', '🙌', '🎉', '🚚', '💡', '✅'];
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! J'ai un colis de 20kg à envoyer de Casablanca à Marrakech. Est-ce que votre trajet passe par là?",
      sender: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      status: 'read'
    },
    {
      id: 2,
      text: "Oui, je passe par Marrakech demain matin. Vous pouvez me décrire le colis?",
      sender: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      status: 'read'
    },
    {
      id: 3,
      text: "C'est une caisse de matériel électronique de 80x50x30cm. Est-ce que ça rentre?",
      sender: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'read'
    },
    {
      id: 4,
      text: "Oui, pas de problème. Je vous envoie les détails de rendez-vous.",
      sender: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
      status: 'delivered'
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: true,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Merci! Je prépare le colis. À demain matin!",
          sender: false,
          timestamp: new Date(),
          status: 'new'
        }
      ]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-indigo-50 rounded-2xl shadow-2xl overflow-hidden border border-indigo-100">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onClose} className="md:hidden mr-3">
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="relative">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-white shadow-md">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-lg">Mohamed Ali</h3>
            <p className="text-indigo-200 text-sm flex items-center">
              <span>En ligne</span>
              <span className="ml-2 bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full hover:bg-indigo-700 transition-colors">
            <PhoneIcon className="h-6 w-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-indigo-700 transition-colors">
            <VideoCameraIcon className="h-6 w-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-indigo-700 transition-colors">
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100">
        <div className="text-center my-6">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm">
            Aujourd'hui
          </div>
        </div>

        {messages.map(msg => (
          <ChatBubble
            key={msg.id}
            message={msg.text}
            isSender={msg.sender}
            timestamp={msg.timestamp}
            status={msg.status}
          />
        ))}
        
        {/* Typing indicator */}
        {messages[messages.length - 1]?.sender && (
          <div className="flex justify-start mb-4">
            <div className="bg-white rounded-3xl px-5 py-3 shadow rounded-bl-none border border-gray-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 p-4 bg-white relative">
        {/* Emoji Picker */}
        {isEmojiPickerOpen && (
          <div className="absolute bottom-20 left-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 w-80 z-10">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-800">Emojis</h4>
              <button 
                onClick={() => setIsEmojiPickerOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {emojis.map((emoji, index) => (
                <AnimatedEmoji 
                  key={index}
                  emoji={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center">
          <button 
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 mr-1"
          >
            <FaceSmileIcon className="h-6 w-6" />
          </button>
          
          <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50 mr-1">
            <PaperClipIcon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 bg-indigo-50 rounded-2xl mx-1 border border-indigo-100">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Écrivez votre message..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-4 text-gray-800 text-lg"
              rows="1"
            />
          </div>
          
          {message ? (
            <button
              onClick={handleSendMessage}
              className="ml-2 p-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-full hover:from-indigo-700 hover:to-purple-800 shadow-lg transition-all transform hover:scale-105"
            >
              <PaperAirplaneIcon className="h-6 w-6 rotate-45" />
            </button>
          ) : (
            <button
              onClick={toggleRecording}
              className={`ml-2 p-3 rounded-full ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              <MicrophoneIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;