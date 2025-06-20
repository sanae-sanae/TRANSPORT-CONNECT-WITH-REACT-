// src/pages/Chat/InboxPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleLeftIcon, 
  MagnifyingGlassIcon, 
  EllipsisVerticalIcon,
  UserPlusIcon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import FloatingIcons from '../../components/animations/FloatingIcons';
import ParticleBackground from '../../components/animations/ParticleBackground';
import GradientButton from '../../components/ui/GradientButton';
import PulseBadge from '../../components/ui/PulseBadge';

const InboxPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = [
    {
      id: 1,
      user: {
        name: 'Transport Pro',
        avatar: 'TP',
        status: 'online',
        verified: true
      },
      lastMessage: 'Bonjour, je suis intéressé par votre annonce Casablanca → Marrakech',
      time: '10:24 AM',
      unread: 3,
      announcement: 'Casablanca → Marrakech • 15/06/2025'
    },
    {
      id: 2,
      user: {
        name: 'Karim Benzema',
        avatar: 'KB',
        status: 'online',
        verified: true
      },
      lastMessage: "D'accord, je vous envoie les détails par email",
      time: 'Hier',
      unread: 0,
      announcement: 'Rabat → Tanger • 16/06/2025'
    },
    {
      id: 3,
      user: {
        name: 'Fast Logistics',
        avatar: 'FL',
        status: 'offline',
        verified: true
      },
      lastMessage: 'Pouvons-nous fixer un RDV pour demain matin?',
      time: '12/06/2025',
      unread: 1,
      announcement: 'Fès → Agadir • 17/06/2025'
    },
    {
      id: 4,
      user: {
        name: 'Sophie Martin',
        avatar: 'SM',
        status: 'online',
        verified: false
      },
      lastMessage: 'Merci pour la livraison rapide!',
      time: '11/06/2025',
      unread: 0,
      announcement: 'Colis: Électronique • 50kg'
    },
    {
      id: 5,
      user: {
        name: 'Premium Trans',
        avatar: 'PT',
        status: 'offline',
        verified: true
      },
      lastMessage: 'Votre colis a été chargé avec succès',
      time: '10/06/2025',
      unread: 0,
      announcement: 'Tanger → Oujda • 18/06/2025'
    }
  ];

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'unread') {
      return matchesSearch && conv.unread > 0;
    }
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 relative overflow-hidden">
      <ParticleBackground />
      <FloatingIcons />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messagerie</h1>
            <p className="text-gray-600">Communiquez avec vos partenaires logistiques</p>
          </div>
          
          <div className="flex space-x-3">
            <GradientButton 
              from="from-blue-600" 
              to="to-indigo-700"
              className="flex items-center px-4 py-2"
            >
              <UserPlusIcon className="h-5 w-5 mr-1" />
              Nouveau chat
            </GradientButton>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Colonne de gauche - Liste des conversations */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* En-tête de la boîte de réception */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Conversations</h2>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <FunnelIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Barre de recherche */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Rechercher des conversations..."
                  />
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      activeFilter === 'all' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tous
                  </button>
                  <button 
                    onClick={() => setActiveFilter('unread')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      activeFilter === 'unread' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Non lus
                  </button>
                </div>
              </div>
              
              {/* Liste des conversations */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex flex-col space-y-4 p-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="bg-gray-100 rounded-xl p-4 animate-pulse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-center">
                          <div className="bg-gray-300 rounded-full w-12 h-12"></div>
                          <div className="ml-3 flex-1">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <AnimatePresence>
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map(conversation => (
                        <motion.div
                          key={conversation.id}
                          className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                            selectedConversation === conversation.id 
                              ? 'bg-blue-50' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setSelectedConversation(conversation.id)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                {conversation.user.avatar}
                              </div>
                              {conversation.user.status === 'online' && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            
                            <div className="ml-4 flex-1 min-w-0">
                              <div className="flex justify-between">
                                <h3 className="font-bold text-gray-900 truncate">{conversation.user.name}</h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{conversation.time}</span>
                              </div>
                              
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                                
                                {conversation.unread > 0 && (
                                  <PulseBadge className="bg-gradient-to-r from-blue-600 to-indigo-700 text-xs">
                                    {conversation.unread}
                                  </PulseBadge>
                                )}
                              </div>
                              
                              <div className="mt-2">
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full truncate max-w-full">
                                  {conversation.announcement}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div 
                        className="flex flex-col items-center justify-center h-full p-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune conversation trouvée</h3>
                        <p className="text-gray-600 mb-4">
                          {searchQuery ? 'Aucun résultat pour votre recherche' : 'Commencez une nouvelle conversation'}
                        </p>
                        <GradientButton 
                          from="from-blue-600" 
                          to="to-indigo-700"
                          className="px-4 py-2"
                        >
                          Nouveau message
                        </GradientButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Colonne de droite - Détails de la conversation */}
          <div className="lg:col-span-3">
            {selectedConversation ? (
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col"
                key={selectedConversation}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                      {conversations.find(c => c.id === selectedConversation)?.user.avatar}
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">
                        {conversations.find(c => c.id === selectedConversation)?.user.name}
                      </h2>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        En ligne
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-indigo-50">
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center my-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {conversations.find(c => c.id === selectedConversation)?.announcement}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        className="flex flex-col items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="max-w-xs md:max-w-md bg-white rounded-2xl rounded-tl-none p-4 shadow">
                          <p>Bonjour, je suis intéressé par votre annonce Casablanca → Marrakech</p>
                          <span className="text-xs text-gray-500 mt-1">09:30 AM</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-end"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="max-w-xs md:max-w-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow">
                          <p>Bonjour, l'annonce est toujours disponible. Quel est le volume de votre marchandise ?</p>
                          <span className="text-xs text-blue-200 mt-1">09:32 AM</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="max-w-xs md:max-w-md bg-white rounded-2xl rounded-tl-none p-4 shadow">
                          <p>J'ai 3 colis de 80x50x60cm chacun, poids total 120kg</p>
                          <span className="text-xs text-gray-500 mt-1">09:35 AM</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-end"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <div className="max-w-xs md:max-w-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl rounded-tr-none p-4 shadow">
                          <p>C'est parfait, ça rentre dans mon camion. On peut fixer un RDV pour demain ?</p>
                          <span className="text-xs text-blue-200 mt-1">09:36 AM</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tapez votre message..."
                    />
                    
                    <button className="ml-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 hover:opacity-90 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col items-center justify-center p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="bg-gradient-to-r from-blue-100 to-indigo-200 p-6 rounded-full mb-6">
                  <ChatBubbleLeftIcon className="h-16 w-16 text-blue-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Bienvenue dans votre messagerie</h2>
                <p className="text-gray-600 max-w-md mb-6">
                  Sélectionnez une conversation existante ou démarrez une nouvelle discussion avec vos partenaires logistiques
                </p>
                
                <GradientButton 
                  from="from-blue-600" 
                  to="to-indigo-700"
                  className="px-6 py-3"
                >
                  Commencer une conversation
                </GradientButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;