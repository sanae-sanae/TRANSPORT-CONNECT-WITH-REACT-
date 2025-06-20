import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Lottie from 'lottie-react';
import locationPin from '../../assets/animations/location-pin.json';
import RouteVisualizer from './RouteVisualizer';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
const createPulsingIcon = (color = '#4f46e5') => {
  return L.divIcon({
    className: 'pulsing-icon',
    html: `
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="animate-ping absolute h-full w-full rounded-full opacity-20" style="background-color: ${color};"></div>
        <div class="relative rounded-full h-3/4 w-3/4 flex items-center justify-center" style="background-color: ${color};">
          <div class="bg-white rounded-full h-1/2 w-1/2"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};
const ResetView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const InteractiveMap = ({ 
  announcements, 
  selectedAnnouncement, 
  onSelectAnnouncement,
  routePoints = [],
  userPosition
}) => {
  const [mapCenter, setMapCenter] = useState([31.7917, -7.0926]); 
  
  useEffect(() => {
    if (selectedAnnouncement) {
      setMapCenter(selectedAnnouncement.departureCoords);
    } else if (announcements.length > 0) {
      setMapCenter(announcements[0].departureCoords);
    }
  }, [selectedAnnouncement, announcements]);

  return (
    <div className="h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative">
      <MapContainer 
        center={mapCenter} 
        zoom={6} 
        className="h-full w-full rounded-2xl"
        scrollWheelZoom={true}
      >
        <ResetView center={mapCenter} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {announcements.map((announcement, index) => (
          <Marker
            key={index}
            position={announcement.departureCoords}
            icon={createPulsingIcon()}
            eventHandlers={{ 
              click: () => {
                onSelectAnnouncement(announcement);
                setMapCenter(announcement.departureCoords);
              }
            }}
          >
            <Popup>
              <div className="font-bold text-indigo-700">{announcement.driver.name}</div>
              <div className="text-sm">De: {announcement.departure}</div>
              <div className="text-sm">À: {announcement.destination}</div>
              <div className="text-sm font-medium mt-1">
                {announcement.availableCapacity} kg disponible
              </div>
            </Popup>
          </Marker>
        ))}
        
        {selectedAnnouncement && (
          <>
            <Marker 
              position={selectedAnnouncement.departureCoords} 
              icon={createPulsingIcon('#10b981')}
            >
              <Popup>
                <div className="font-bold text-green-700">Départ</div>
                <div className="text-sm">{selectedAnnouncement.departure}</div>
              </Popup>
            </Marker>
            
            <Marker 
              position={selectedAnnouncement.destinationCoords} 
              icon={createPulsingIcon('#ef4444')}
            >
              <Popup>
                <div className="font-bold text-red-700">Destination</div>
                <div className="text-sm">{selectedAnnouncement.destination}</div>
              </Popup>
            </Marker>
            
            <Polyline
              positions={[
                selectedAnnouncement.departureCoords, 
                ...(selectedAnnouncement.stepsCoords || []),
                selectedAnnouncement.destinationCoords
              ]}
              color="#4f46e5"
              weight={4}
              dashArray="5, 10"
            />
            
            <RouteVisualizer 
              route={[
                selectedAnnouncement.departureCoords,
                ...(selectedAnnouncement.stepsCoords || []),
                selectedAnnouncement.destinationCoords
              ]} 
            />
          </>
        )}
        
        {routePoints.length > 0 && (
          <Polyline
            positions={routePoints}
            color="#8b5cf6"
            weight={3}
          />
        )}
        
        {userPosition && (
          <Marker 
            position={userPosition} 
            icon={L.divIcon({
              className: 'user-location',
              html: `
                <div class="relative">
                  <div class="absolute -inset-2 bg-indigo-600 rounded-full opacity-20 animate-ping"></div>
                  <div class="relative w-8 h-8 bg-white rounded-full border-4 border-indigo-600 flex items-center justify-center">
                    <div class="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>
              <div className="font-bold text-indigo-700">Votre position</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      
      <div className="absolute top-4 right-4 z-[1000] bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
          <span className="text-sm">Annonces disponibles</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Point de départ</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm">Destination</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
          <span className="text-sm">Votre position</span>
        </div>
      </div>
      
      {selectedAnnouncement && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl shadow-xl p-4 max-w-md w-full">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">{selectedAnnouncement.departure} → {selectedAnnouncement.destination}</h3>
              <p className="text-indigo-200 text-sm flex items-center">
                <span>{selectedAnnouncement.driver.name}</span>
                <span className="mx-2">•</span>
                <span>{selectedAnnouncement.availableCapacity} kg disponible</span>
              </p>
            </div>
            <button 
              onClick={() => onSelectAnnouncement(null)}
              className="text-indigo-200 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;