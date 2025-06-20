import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;
const BASE_URL = 'https://api.mapbox.com';
export const getRoute = async (coordinates) => {
  try {
    const coordsString = coordinates.map(coord => `${coord[0]},${coord[1]}`).join(';');
    const response = await axios.get(`${BASE_URL}/directions/v5/mapbox/driving/${coordsString}`, {
      params: {
        access_token: API_KEY,
        geometries: 'geojson',
        overview: 'full',
        steps: true,
        annotations: 'distance,duration'
      }
    });
    return response.data.routes[0];
  } catch (error) {
    console.error('Error fetching route:', error);
    toast.error('Erreur lors de la récupération de l\'itinéraire');
    throw error;
  }
};
export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(`${BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`, {
      params: {
        access_token: API_KEY,
        limit: 1,
        types: 'address'
      }
    });
    
    if (response.data.features.length === 0) {
      toast.error('Adresse non trouvée');
      return null;
    }
    
    return response.data.features[0].center;
  } catch (error) {
    console.error('Error geocoding address:', error);
    toast.error('Erreur lors de la conversion de l\'adresse');
    throw error;
  }
};
export const reverseGeocode = async (lng, lat) => {
  try {
    const response = await axios.get(`${BASE_URL}/geocoding/v5/mapbox.places/${lng},${lat}.json`, {
      params: {
        access_token: API_KEY,
        types: 'address,poi'
      }
    });
    
    if (response.data.features.length === 0) {
      return 'Adresse inconnue';
    }
    
    return response.data.features[0].place_name;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    toast.error('Erreur lors de la récupération des détails du lieu');
    return 'Adresse inconnue';
  }
};
export const getSuggestedRoutes = async (origin, destination) => {
  try {
    const response = await axios.get(`${BASE_URL}/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}`, {
      params: {
        access_token: API_KEY,
        alternatives: true,
        geometries: 'geojson',
        overview: 'simplified'
      }
    });
    
    return response.data.routes;
  } catch (error) {
    console.error('Error fetching suggested routes:', error);
    toast.error('Erreur lors de la récupération des trajets suggérés');
    return [];
  }
};
export const getDistanceMatrix = async (coordinates) => {
  try {
    const coordsString = coordinates.map(coord => `${coord[0]},${coord[1]}`).join(';');
    const response = await axios.get(`${BASE_URL}/directions-matrix/v1/mapbox/driving/${coordsString}`, {
      params: {
        access_token: API_KEY,
        annotations: 'distance,duration'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    toast.error('Erreur lors du calcul des distances');
    return null;
  }
};
export const searchPlaces = async (query, proximity) => {
  try {
    const response = await axios.get(`${BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`, {
      params: {
        access_token: API_KEY,
        proximity: proximity.join(','),
        types: 'poi',
        limit: 5
      }
    });
    
    return response.data.features;
  } catch (error) {
    console.error('Error searching places:', error);
    toast.error('Erreur lors de la recherche de lieux');
    return [];
  }
};