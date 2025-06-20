import { useState, useEffect, useCallback } from 'react';
import { useAnimation } from '../contexts/AnimationContext';

const useGeolocation = (options = {}) => {
  const { playAnimation } = useAnimation();
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const onSuccess = useCallback((pos) => {
    const { 
      coords: { 
        latitude, 
        longitude, 
        accuracy, 
        altitude: alt,
        speed: spd,
        heading: hdg 
      } 
    } = pos;
    
    setPosition({ lat: latitude, lng: longitude, accuracy });
    if (spd !== null) setSpeed(spd);
    if (hdg !== null) setHeading(hdg);
    if (alt !== null) setAltitude(alt);
    playAnimation('location', { 
      duration: 1000,
      style: { 
        top: `${Math.random() * 80 + 10}%`, 
        left: `${Math.random() * 80 + 10}%`,
        width: '50px',
        height: '50px'
      }
    });
  }, [playAnimation]);
  const onError = useCallback((err) => {
    setError(err.message);
    playAnimation('error', { duration: 3000 });
  }, [playAnimation]);
  const startTracking = useCallback(() => {
    if (isTracking) return;
    
    if ('geolocation' in navigator) {
      setIsTracking(true);
      const id = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        {
          enableHighAccuracy: options.enableHighAccuracy || true,
          timeout: options.timeout || 10000,
          maximumAge: options.maximumAge || 0
        }
      );
      setWatchId(id);
      playAnimation('loading', { duration: 1000 });
    } else {
      setError('Géolocalisation non supportée');
      playAnimation('error', { duration: 3000 });
    }
  }, [isTracking, onSuccess, onError, options, playAnimation]);
  const stopTracking = useCallback(() => {
    if (watchId && isTracking) {
      navigator.geolocation.clearWatch(watchId);
      setIsTracking(false);
      setWatchId(null);
      playAnimation('success', { duration: 1000 });
    }
  }, [watchId, isTracking, playAnimation]);
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return {
    position,
    error,
    isTracking,
    speed: Math.round(speed * 3.6),
    heading,
    altitude,
    accuracy: position?.accuracy || null,
    startTracking,
    stopTracking
  };
};

export default useGeolocation;