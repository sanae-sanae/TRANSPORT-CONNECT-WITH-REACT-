
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};
export const calculateTravelTime = (distance, averageSpeed = 60) => {
  const hours = distance / averageSpeed;
  const minutes = Math.round((hours % 1) * 60);
  
  if (hours < 1) return `${minutes} min`;
  if (minutes === 0) return `${Math.floor(hours)} h`;
  return `${Math.floor(hours)} h ${minutes} min`;
};
export const formatAddress = (address) => {
  if (!address) return 'Adresse inconnue';
  
  const parts = [
    address.road,
    address.city,
    address.state,
    address.country
  ].filter(Boolean);
  
  return parts.join(', ');
};
export const getBounds = (points) => {
  if (points.length === 0) return null;
  
  let minLat = points[0].lat;
  let maxLat = points[0].lat;
  let minLng = points[0].lng;
  let maxLng = points[0].lng;
  
  points.forEach(point => {
    minLat = Math.min(minLat, point.lat);
    maxLat = Math.max(maxLat, point.lat);
    minLng = Math.min(minLng, point.lng);
    maxLng = Math.max(maxLng, point.lng);
  });
  
  return [
    [minLat, minLng],
    [maxLat, maxLng]
  ];
};