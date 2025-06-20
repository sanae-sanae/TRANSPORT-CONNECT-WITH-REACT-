import React from 'react';
import { TruckIcon, MapPinIcon, CalendarIcon, CubeIcon, UserIcon, StarIcon } from '@heroicons/react/24/outline';
import Lottie from 'lottie-react';
import locationPin from '../assets/animations/location-pin.json';

const AnnouncementCard = ({ announcement }) => {
  const { driver, departure, destination, steps, maxDimensions, cargoType, availableCapacity, date } = announcement;
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl overflow-hidden border border-indigo-100 transform transition-all hover:scale-[1.02] hover:shadow-2xl duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900">{driver.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <StarIcon className="h-4 w-4 text-amber-500 mr-1" />
                <span className="font-medium">{driver.rating}</span>
                <span className="mx-1">•</span>
                <span>{driver.trips} trajets</span>
              </div>
            </div>
          </div>
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Vérifié
          </span>
        </div>

        <div className="relative mb-6">
          <div className="absolute top-5 left-5 z-10">
            <Lottie animationData={locationPin} className="w-10 h-10" loop={true} />
          </div>
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start">
            <MapPinIcon className="h-6 w-6 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Départ</p>
              <p className="font-medium text-gray-900">{departure}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPinIcon className="h-6 w-6 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium text-gray-900">{destination}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CalendarIcon className="h-6 w-6 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-900">{new Date(date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CubeIcon className="h-6 w-6 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Capacité</p>
              <p className="font-medium text-gray-900">{availableCapacity} kg</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            <TruckIcon className="h-4 w-4 mr-1" />
            {cargoType}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Dimensions: {maxDimensions}
          </span>
          {steps && steps.length > 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {steps.length} étapes
            </span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-700">
            {announcement.price} MAD
          </span>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Envoyer demande
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;