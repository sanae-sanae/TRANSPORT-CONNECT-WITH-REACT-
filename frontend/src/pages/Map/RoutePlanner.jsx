import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMap, FiTruck, FiPackage, FiNavigation } from 'react-icons/fi';
import RouteVisualizer from '../../components/map/RouteVisualizer';
import GradientButton from '../../components/ui/GradientButton';
import HoverCard from '../../components/ui/HoverCard';

const RoutePlanner = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);

  const sampleRoute = [
    { lat: 33.5731, lng: -7.5898 },
    { lat: 33.5831, lng: -7.5998 },
    { lat: 33.5931, lng: -7.6198 }
  ];

  const sampleMarkers = [
    { position: sampleRoute[0], title: "Départ", description: "Casablanca" },
    { position: sampleRoute[2], title: "Destination", description: "Rabat" }
  ];

  const handleAddWaypoint = () => {
    if (waypoints.length < 5) {
      setWaypoints([...waypoints, { name: `Étape ${waypoints.length + 1}`, address: '' }]);
    }
  };

  const planRoute = () => {
    setCurrentRoute(sampleRoute);
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center gradient-text"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Planificateur d'Itinéraire
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <HoverCard className="p-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
              <FiNavigation className="mr-2" /> Créer un nouvel itinéraire
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-700">
                  Point de départ
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder="Adresse de départ"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <FiMap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-2 text-gray-700">
                  Destination
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Adresse de destination"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <FiMap className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Étape intermédiaires
                  </label>
                  <button 
                    type="button"
                    onClick={handleAddWaypoint}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                    disabled={waypoints.length >= 5}
                  >
                    + Ajouter une étape
                  </button>
                </div>
                
                {waypoints.map((waypoint, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex-1 mr-2">
                      <input
                        type="text"
                        value={waypoint.address}
                        onChange={(e) => {
                          const newWaypoints = [...waypoints];
                          newWaypoints[index].address = e.target.value;
                          setWaypoints(newWaypoints);
                        }}
                        placeholder={`Étape ${index + 1}`}
                        className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        const newWaypoints = [...waypoints];
                        newWaypoints.splice(index, 1);
                        setWaypoints(newWaypoints);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <FiPackage />
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-4">
                <GradientButton 
                  onClick={planRoute}
                  className="w-full py-4"
                >
                  Planifier l'itinéraire
                </GradientButton>
              </div>
            </div>
          </HoverCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HoverCard glowColor="rgba(139, 92, 246, 0.5)" className="p-6">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
              <FiTruck className="mr-2" /> Visualisation de l'itinéraire
            </h2>
            
            {currentRoute ? (
              <RouteVisualizer 
                route={currentRoute} 
                markers={sampleMarkers} 
              />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <FiNavigation className="text-5xl text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Aucun itinéraire planifié
                </h3>
                <p className="text-gray-500">
                  Créez un nouvel itinéraire pour le visualiser ici
                </p>
              </div>
            )}
            
            {currentRoute && (
              <div className="mt-4 bg-indigo-50 p-4 rounded-xl">
                <h3 className="font-bold text-indigo-700 mb-2">Détails de l'itinéraire</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-semibold">142 km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Durée estimée</p>
                    <p className="font-semibold">2h 15min</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coût estimé</p>
                    <p className="font-semibold">350 MAD</p>
                  </div>
                </div>
              </div>
            )}
          </HoverCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoutePlanner;