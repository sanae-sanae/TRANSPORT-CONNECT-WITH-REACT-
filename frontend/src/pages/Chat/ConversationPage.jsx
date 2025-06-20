
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
  EmojiHappyIcon,
  PhoneIcon,
  EllipsisVerticalIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import FloatingIcons from '../../components/animations/FloatingIcons';
import ParticleBackground from '../../components/animations/ParticleBackground';
import GradientButton from '../../components/ui/GradientButton';
import PulseBadge from '../../components/ui/PulseBadge';

const ConversationPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Bonjour, je suis intéressé par votre annonce Casablanca → Marrakech', sender: 'other', time: '09:30' },
    { id: 2, text: "Bonjour, l'annonce est toujours disponible. Quel est le volume de votre marchandise ?", sender: 'me', time: '09:32' },
    { id: 3, text: "J'ai 3 colis de 80x50x60cm chacun, poids total 120kg", sender: 'other', time: '09:35' },
    { id: 4, text: "C'est parfait, ça rentre dans mon camion. On peut fixer un RDV pour demain ?", sender: 'me', time: '09:36' },
    { id: 5, text: "Oui, demain matin à 10h vous convient ?", sender: 'other', time: '09:40' },
    { id: 6, text: "Parfait, je vous envoie l'adresse par email", sender: 'me', time: '09:41' },
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [user] = useState({
    name: 'Transport Pro',
    status: 'online',
    rating: 4.7,
    deliveries: 42,
    memberSince: 'Jan 2023',
    verified: true
  });

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev, 
          {
            id: prev.length + 2,
            text: "D'accord, je vous attends demain à 10h",
            sender: 'other',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 2000 + Math.random() * 2000);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 relative overflow-hidden">
      <ParticleBackground />
      <FloatingIcons />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/chat" className="mr-4 text-blue-200 hover:text-white md:hidden">
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                  TP
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="ml-4">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-blue-100">En ligne</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="text-blue-200 hover:text-white">
                <PhoneIcon className="h-6 w-6" />
              </button>
              <button className="text-blue-200 hover:text-white">
                <EllipsisVerticalIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[calc(100vh-220px)] overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-indigo-100">
            <div className="max-w-3xl mx-auto">
              <div className="text-center my-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Annonce: Casablanca → Marrakech • 15/06/2025
                </span>
              </div>
              
              <div className="space-y-6">
                <AnimatePresence>
                  {messages.map(message => (
                    <motion.div 
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className={`max-w-xs md:max-w-md rounded-2xl p-4 ${
                          message.sender === 'me' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-none' 
                            : 'bg-white rounded-tl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <span className={`text-xs mt-1 block text-right ${
                          message.sender === 'me' ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="bg-white rounded-2xl rounded-tl-none p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center">
              <button className="text-gray-500 hover:text-blue-600 p-2 mr-1">
                <PaperClipIcon className="h-6 w-6" />
              </button>
              <button className="text-gray-500 hover:text-blue-600 p-2 mr-3">
                <EmojiHappyIcon className="h-6 w-6" />
              </button>
              
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tapez votre message..."
              />
              
              <button 
                onClick={handleSend}
                className="ml-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 hover:opacity-90 transition-opacity"
              >
                <PaperAirplaneIcon className="h-6 w-6 text-white transform rotate-45" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar pour les détails du transporteur (sur desktop) */}
        <motion.div 
          className="hidden lg:block absolute top-8 right-8 w-72"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <h2 className="text-xl font-bold text-white">Transporteur</h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl mb-4">
                  TP
                </div>
                <div className="flex items-center">
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  {user.verified && (
                    <PulseBadge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-600 text-xs">
                      Vérifié
                    </PulseBadge>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(user.rating) ? 'fill-current' : ''}`} 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{user.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Livraisons</p>
                  <p className="text-xl font-bold">{user.deliveries}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Membre depuis</p>
                  <p className="text-xl font-bold">{user.memberSince}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <GradientButton 
                  from="from-indigo-600" 
                  to="to-purple-700"
                  className="w-full py-3 flex items-center justify-center"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                  Nouveau message
                </GradientButton>
                
                <button className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Voir le profil
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConversationPage;