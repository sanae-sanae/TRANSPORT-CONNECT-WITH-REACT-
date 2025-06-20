import { useState, useEffect, useCallback } from 'react';
import { useMap } from '../contexts/MapContext';
import { useAnimation } from '../contexts/AnimationContext';
import api from '../services/api';

const useMapRoutes = () => {
  const { mapInstance, calculateRoute, updateUserPosition } = useMap();
  const { playAnimation } = useAnimation();
  const [routeDetails, setRouteDetails] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const calculateRouteWithWaypoints = useCallback(async (start, end) => {
    try {
      setIsCalculating(true);
      playAnimation('loading');
      
      const route = await calculateRoute(start, end, waypoints);
      if (!route) return null;
      
      setRouteDetails({
        distance: (route.distance / 1000).toFixed(1),
        duration: Math.round(route.duration / 60),
        coordinates: route.coordinates
      });
      
      playAnimation('success', { duration: 2000 });
      return route;
    } catch (error) {
      console.error('Erreur de calcul:', error);
      playAnimation('error', { duration: 3000 });
      return null;
    } finally {
      setIsCalculating(false);
    }
  }, [calculateRoute, waypoints, playAnimation]);
  const optimizeRoute = useCallback(async () => {
    if (!routeDetails) return;
    
    try {
      setIsCalculating(true);
      playAnimation('loading');
      
      const { data } = await api.post('/routes/optimize', {
        waypoints,
        route: routeDetails.coordinates
      });
      
      setRouteDetails(prev => ({
        ...prev,
        distance: (data.distance / 1000).toFixed(1),
        duration: Math.round(data.duration / 60),
        coordinates: data.coordinates
      }));
      
      setWaypoints(data.optimizedWaypoints);
      playAnimation('success', { duration: 2000 });
      return data;
    } catch (error) {
      console.error('Erreur d\'optimisation:', error);
      playAnimation('error', { duration: 3000 });
      return null;
    } finally {
      setIsCalculating(false);
    }
  }, [routeDetails, waypoints, playAnimation]);
  const addWaypoint = useCallback((point) => {
    setWaypoints(prev => [...prev, point]);
    playAnimation('location', { duration: 1000 });
  }, [playAnimation]);
  const removeWaypoint = useCallback((index) => {
    setWaypoints(prev => prev.filter((_, i) => i !== index));
    playAnimation('success', { duration: 1000 });
  }, [playAnimation]);
  const centerOnUser = useCallback(() => {
    if (mapInstance && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          updateUserPosition({ lat: latitude, lng: longitude });
          mapInstance.flyTo([latitude, longitude], 15);
          playAnimation('location', { duration: 1000 });
        },
        (err) => {
          console.error('Erreur de géolocalisation:', err);
          playAnimation('error', { duration: 3000 });
        }
      );
    }
  }, [mapInstance, playAnimation, updateUserPosition]);
  useEffect(() => {
    centerOnUser();
  }, [centerOnUser]);

  return {
    routeDetails,
    isCalculating,
    waypoints,
    calculateRoute: calculateRouteWithWaypoints,
    optimizeRoute,
    addWaypoint,
    removeWaypoint,
    centerOnUser
  };
};

export default useMapRoutes;