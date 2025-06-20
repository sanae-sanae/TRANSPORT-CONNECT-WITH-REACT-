import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  MapPinIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

const LocationPicker = ({ onLocationSelect, initialPosition }) => {
  const [position, setPosition] = useState(initialPosition || null);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (position) {
      fetchAddress(position);
    }
  }, [position]);

  const fetchAddress = async (latlng) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`
      );
      const data = await response.json();
      
      if (data.address) {
        const { road, city, town, village, county, state, country } = data.address;
        const addressParts = [
          road,
          city || town || village || county,
          state,
          country
        ].filter(part => part);
        
        setAddress(addressParts.join(', '));
      } else {
        setAddress('Adresse non trouvée');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Erreur de récupération');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (position && address) {
      onLocationSelect({
        coordinates: position,
        address
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sélectionnez un emplacement</h2>
        <p className="text-gray-600 mb-6">Cliquez sur la carte pour choisir un lieu</p>
        
        <div className="h-96 rounded-xl overflow-hidden mb-6 border border-gray-200 relative">
          <MapContainer 
            center={initialPosition || [31.7917, -7.0926]} 
            zoom={6} 
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
          
          <div className="absolute top-4 left-4 z-[1000] bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-3 flex items-center">
            <MapPinIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <span className="font-medium">Cliquez pour sélectionner</span>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-xl p-4 mb-6 border border-indigo-100">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-3 rounded-lg mr-4">
              <MapPinIcon className="h-6 w-6 text-indigo-600" />
            </div>
            
            {isLoading ? (
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            ) : position ? (
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Emplacement sélectionné</h3>
                <p className="text-gray-700">{address || 'Cliquez sur la carte pour sélectionner un emplacement'}</p>
                <div className="text-sm text-gray-500 mt-1">
                  {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                </div>
              </div>
            ) : (
              <div className="flex-1 text-gray-600">
                Aucun emplacement sélectionné
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => onLocationSelect(null)}
            className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            disabled={!position || isLoading}
            className={`px-6 py-3 font-medium rounded-xl transition-all flex items-center ${
              !position || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Confirmer l'emplacement
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;