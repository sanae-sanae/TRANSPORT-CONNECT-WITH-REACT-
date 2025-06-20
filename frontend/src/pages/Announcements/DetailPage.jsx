// src/pages/Announcements/DetailPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  TruckIcon, 
  MapPinIcon, 
  CalendarIcon, 
  CubeIcon, 
  ScaleIcon, 
  UserIcon, 
  StarIcon,
  ChatBubbleLeftIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import InteractiveMap from '../../components/map/InteractiveMap';
import GradientButton from '../../components/ui/GradientButton';
import HoverCard from '../../components/ui/HoverCard';
import PulseBadge from '../../components/ui/PulseBadge';

const DetailPage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [requestSent, setRequestSent] = useState(false);
  
  const announcement = {
    id: 1,
    origin: 'Casablanca',
    destination: 'Marrakech',
    departure: '15/06/2025 08:00',
    arrival: '15/06/2025 12:00',
    dimensions: '3m x 2m x 2m',
    weight: '500 kg',
    price: '1200 DH',
    user: {
      name: 'Karim Benzema',
      rating: 4.7,
      deliveries: 42,
      memberSince: 'Jan 2023',
      verified: true
    },
    capacity: '800 kg',
    vehicle: 'Volvo FH16 Camion frigorifique',
    description: 'Transport professionnel de marchandises entre Casablanca et Marrakech. Espace frigorifique disponible pour produits sensibles. Chargement et déchargement assisté.',
    restrictions: 'Pas de produits dangereux ou illicites. Emballage requis pour les articles fragiles.',
    route: [
      { lat: 33.5731, lng: -7.5898, name: 'Casablanca' },
      { lat: 33.5333, lng: -7.5833, name: 'Settat' },
      { lat: 32.2833, lng: -8.5000, name: 'Safi' },
      { lat: 31.6295, lng: -7.9811, name: 'Marrakech' }
    ],
    reviews: [
      { id: 1, user: 'Sophie Martin', rating: 5, comment: 'Livraison rapide et professionnelle, je recommande !', date: '15/05/2025' },
      { id: 2, user: 'Ahmed Khalid', rating: 4, comment: 'Très bon service, juste un peu de retard mais colis bien protégé', date: '10/05/2025' },
      { id: 3, user: 'Marie Dupont', rating: 5, comment: 'Meilleur transporteur sur la plateforme, toujours ponctuel', date: '02/05/2025' },
    ]
  };

  const sendRequest = () => {
    setRequestSent(true);
    // Simulation d'envoi de demande
    setTimeout(() => {
      setRequestSent(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Bouton de retour */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          className="flex items-center text-blue-600 hover:text-blue-800 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour aux annonces
        </motion.button>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Colonne de gauche - Détails de l'annonce */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {announcement.origin} → {announcement.destination}
                    </h1>
                    <div className="flex items-center mt-2">
                      <PulseBadge className="bg-gradient-to-r from-blue-500 to-indigo-600">
                        Disponible
                      </PulseBadge>
                      <span className="ml-3 text-sm text-gray-500 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Départ: {announcement.departure}
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-indigo-700">{announcement.price}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex space-x-4 mb-6">
                  <button 
                    onClick={() => setActiveTab('details')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'details' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Détails
                  </button>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'reviews' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Avis ({announcement.reviews.length})
                  </button>
                  <button 
                    onClick={() => setActiveTab('map')}
                    className={`px-4 py-2 rounded-lg ${
                      activeTab === 'map' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Itinéraire
                  </button>
                </div>
                
                {activeTab === 'details' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <HoverCard>
                        <div className="p-5">
                          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                            <TruckIcon className="h-5 w-5 mr-2 text-blue-500" />
                            Détails du transport
                          </h3>
                          <ul className="space-y-2 text-gray-600">
                            <li className="flex justify-between">
                              <span>Véhicule:</span>
                              <span className="font-medium">{announcement.vehicle}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Capacité disponible:</span>
                              <span className="font-medium">{announcement.capacity}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Dimensions max:</span>
                              <span className="font-medium">{announcement.dimensions}</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Poids max par colis:</span>
                              <span className="font-medium">{announcement.weight}</span>
                            </li>
                          </ul>
                        </div>
                      </HoverCard>
                      
                      <HoverCard>
                        <div className="p-5">
                          <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                            <CubeIcon className="h-5 w-5 mr-2 text-blue-500" />
                            Restrictions
                          </h3>
                          <p className="text-gray-600">{announcement.restrictions}</p>
                        </div>
                      </HoverCard>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                        <MapPinIcon className="h-5 w-5 mr-2 text-blue-500" />
                        Description du trajet
                      </h3>
                      <p className="text-gray-600">{announcement.description}</p>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6 flex items-center">
                      <div className="text-4xl font-bold mr-4">{announcement.user.rating}</div>
                      <div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.floor(announcement.user.rating) ? 'fill-current' : ''}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mt-1">{announcement.reviews.length} avis</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {announcement.reviews.map(review => (
                        <motion.div 
                          key={review.id}
                          className="border border-gray-200 rounded-xl p-5"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            <span className="text-gray-500 text-sm">{review.date}</span>
                          </div>
                          <div className="flex mt-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'map' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="h-96 rounded-xl overflow-hidden"
                  >
                    <InteractiveMap 
                      route={announcement.route} 
                      markers={announcement.route}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Colonne de droite - Actions et transporteur */}
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <h2 className="text-xl font-bold">Envoyer une demande</h2>
              </div>
              
              <div className="p-6">
                {requestSent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée!</h3>
                    <p className="text-gray-600">Le transporteur a été notifié et vous répondra rapidement</p>
                  </div>
                ) : (
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description du colis</label>
                      <textarea 
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                        rows="3" 
                        placeholder="Décrivez votre marchandise..."
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (m)</label>
                        <input 
                          type="text" 
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                          placeholder="L x W x H"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg)</label>
                        <input 
                          type="number" 
                          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                          placeholder="Ex: 150"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type de marchandise</label>
                      <select className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                        <option>Sélectionnez un type</option>
                        <option>Alimentaire</option>
                        <option>Électronique</option>
                        <option>Textile</option>
                        <option>Médical</option>
                        <option>Automobile</option>
                      </select>
                    </div>
                    
                    <div className="pt-4">
                      <GradientButton 
                        onClick={sendRequest}
                        from="from-blue-600" 
                        to="to-indigo-700"
                        className="w-full py-3"
                      >
                        Envoyer la demande
                      </GradientButton>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <h2 className="text-xl font-bold">Transporteur</h2>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold">{announcement.user.name}</h3>
                      {announcement.user.verified && (
                        <span className="ml-2 flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          <ShieldCheckIcon className="h-3 w-3 mr-1" />
                          Vérifié
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(announcement.user.rating) ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{announcement.user.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Livraisons</p>
                    <p className="text-xl font-bold">{announcement.user.deliveries}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Membre depuis</p>
                    <p className="text-xl font-bold">{announcement.user.memberSince}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
                    Profil
                  </button>
                  <GradientButton 
                    from="from-indigo-600" 
                    to="to-purple-700"
                    className="flex-1 py-2 flex items-center justify-center"
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                    Contacter
                  </GradientButton>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <h2 className="text-xl font-bold">Informations clés</h2>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <MapPinIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Départ</h3>
                      <p className="text-gray-600">{announcement.origin}</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <MapPinIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Destination</h3>
                      <p className="text-gray-600">{announcement.destination}</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <CalendarIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Date et heure</h3>
                      <p className="text-gray-600">{announcement.departure}</p>
                      <p className="text-gray-600">Arrivée estimée: {announcement.arrival}</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <CubeIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Capacité</h3>
                      <p className="text-gray-600">{announcement.capacity} disponibles</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailPage;