import React, { useState, useEffect } from 'react';
import InteractiveMap from '../../components/map/InteractiveMap';
import { LocationMarkerIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline';

const LiveTracking = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 33.5731, lng: -7.5898 });
  const [route, setRoute] = useState([
    { lat: 33.5731, lng: -7.5898 }, 
    { lat: 31.6295, lng: -7.9811 }, 
  ]);
  
  const [progress, setProgress] = useState(35);
  const [driverInfo, setDriverInfo] = useState({
    name: 'Karim Benzema',
    rating: 4.8,
    vehicle: 'Volvo FH16',
    plate: 'A-123-BCD'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 5, 100));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-3">Suivi en Temps Réel</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Suivez votre marchandise en direct avec notre système de géolocalisation précis
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-[500px]">
              <InteractiveMap 
                currentLocation={currentLocation} 
                route={route} 
                markers={route}
              />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-start mb-6">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div className="ml-4">
                <h2 className="text-2xl font-bold">{driverInfo.name}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <span className="ml-2 text-gray-300">{driverInfo.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-xl p-4 mb-6">
              <div className="flex items-center mb-3">
                <TruckIcon className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-lg font-medium">Détails du véhicule</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-400">Modèle</p>
                  <p className="font-medium">{driverInfo.vehicle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Plaque</p>
                  <p className="font-medium">{driverInfo.plate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Capacité</p>
                  <p className="font-medium">15 tonnes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-medium">Remorque frigorifique</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <LocationMarkerIcon className="h-5 w-5 text-red-500 mr-2" />
                  <span>Casablanca</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-blue-400 mr-2" />
                  <span>2h 15min restantes</span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-right">
                <span className="text-blue-400 font-medium">{progress}% complété</span>
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-xl p-4">
              <h3 className="font-medium mb-3">Détails du trajet</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Distance totale</span>
                  <span className="font-medium">240 km</span>
                </div>
                <div className="flex justify-between">
                  <span>Départ estimé</span>
                  <span className="font-medium">15/06/2025 08:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Arrivée estimée</span>
                  <span className="font-medium">15/06/2025 12:15</span>
                </div>
                <div className="flex justify-between">
                  <span>Statut</span>
                  <span className="font-medium text-green-400">En route</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;