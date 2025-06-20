import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Lottie from 'lottie-react';
import locationPin from '../assets/animations/location-pin.json';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = L.divIcon({
  className: 'custom-icon',
  html: `<div class="w-12 h-12 relative">
    <div class="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-20"></div>
    <div class="absolute inset-2 bg-indigo-600 rounded-full"></div>
  </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
});

const AnnouncementMap = ({ announcements, onAnnouncementSelect }) => {
  const [mapCenter, setMapCenter] = useState([31.7917, -7.0926]); // Centre par défaut (Maroc)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    if (announcements.length > 0 && !selectedAnnouncement) {
      const firstAnnouncement = announcements[0];
      setMapCenter(firstAnnouncement.departureCoords);
      setSelectedAnnouncement(firstAnnouncement);
    }
  }, [announcements, selectedAnnouncement]);

  const handleMarkerClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    if (onAnnouncementSelect) {
      onAnnouncementSelect(announcement);
    }
  };

  return (
    <div className="h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      <MapContainer 
        center={mapCenter} 
        zoom={6} 
        className="h-full w-full rounded-2xl"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {announcements.map((announcement, index) => (
          <Marker
            key={index}
            position={announcement.departureCoords}
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick(announcement) }}
          >
            <Popup>
              <div className="font-bold text-indigo-700">{announcement.driver.name}</div>
              <div className="text-sm">De: {announcement.departure}</div>
              <div className="text-sm">À: {announcement.destination}</div>
              <div className="text-sm font-medium mt-1">{announcement.availableCapacity} kg disponible</div>
            </Popup>
          </Marker>
        ))}
        
        {selectedAnnouncement && selectedAnnouncement.destinationCoords && (
          <>
            <Marker position={selectedAnnouncement.destinationCoords} icon={customIcon}>
              <Popup>
                <div className="font-bold text-purple-700">Destination</div>
                <div className="text-sm">{selectedAnnouncement.destination}</div>
              </Popup>
            </Marker>
            <Polyline
              positions={[selectedAnnouncement.departureCoords, selectedAnnouncement.destinationCoords]}
              color="#4f46e5"
              weight={3}
              dashArray="5, 10"
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default AnnouncementMap;