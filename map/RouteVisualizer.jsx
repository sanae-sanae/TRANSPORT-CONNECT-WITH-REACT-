import React, { useState, useEffect } from 'react';
import { Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { TruckIcon } from '@heroicons/react/24/outline';

const RouteVisualizer = ({ route }) => {
  const [animatedPolyline, setAnimatedPolyline] = useState(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (!route || route.length < 2) return;
    const polyline = L.polyline([], {
      color: '#10b981',
      weight: 4,
      dashArray: '5, 10'
    });
    
    setAnimatedPolyline(polyline);
    setProgress(0);
    
    return () => {
      if (polyline) {
        polyline.remove();
      }
    };
  }, [route]);
  
  useEffect(() => {
    if (!animatedPolyline || !route || route.length < 2) return;
    
    let currentIndex = 0;
    const totalPoints = route.length;
    const animationDuration = 5000;
    
    const animate = () => {
      if (currentIndex < totalPoints) {
        const segment = route.slice(0, currentIndex + 1);
        animatedPolyline.setLatLngs(segment);
        let distance = 0;
        for (let i = 1; i < segment.length; i++) {
          distance += L.latLng(segment[i-1]).distanceTo(segment[i]);
        }
        let totalDistance = 0;
        for (let i = 1; i < route.length; i++) {
          totalDistance += L.latLng(route[i-1]).distanceTo(route[i]);
        }
        
        setProgress(Math.min(100, (distance / totalDistance) * 100));
        
        currentIndex++;
        setTimeout(animate, animationDuration / totalPoints);
      }
    };
    
    animate();
  }, [animatedPolyline, route]);

  if (!route || route.length < 2) return null;

  return (
    <>
      <Polyline
        positions={route}
        color="#e5e7eb"
        weight={6}
      />
      
      {animatedPolyline && (
        <>
          <Polyline
            positions={animatedPolyline.getLatLngs()}
            color="#10b981"
            weight={4}
            dashArray="5, 10"
          >
            <Tooltip direction="top" opacity={1} permanent>
              <div className="flex items-center bg-white rounded-lg shadow-lg px-3 py-2">
                <div className="bg-green-100 p-2 rounded-full mr-2">
                  <TruckIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-green-700">Trajet en cours</div>
                  <div className="text-xs text-gray-600">
                    {progress.toFixed(1)}% parcouru
                  </div>
                </div>
              </div>
            </Tooltip>
          </Polyline>
          
          <MarkerWithProgress position={route[0]} progress={progress} />
        </>
      )}
    </>
  );
};
const MarkerWithProgress = ({ position, progress }) => {
  return L.marker(position, {
    icon: L.divIcon({
      className: 'moving-truck',
      html: `
        <div class="relative">
          <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-green-500 rounded-full transition-all duration-300"
              style="width: ${progress}%"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
              ${progress.toFixed(0)}%
            </div>
          </div>
          <div class="relative w-10 h-10">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="50" width="80" height="30" rx="5" fill="#4f46e5" />
              <rect x="15" y="55" width="15" height="20" rx="2" fill="#c7d2fe" />
              <rect x="60" y="55" width="15" height="20" rx="2" fill="#c7d2fe" />
              <circle cx="25" cy="80" r="8" fill="#1e293b" />
              <circle cx="75" cy="80" r="8" fill="#1e293b" />
              <rect x="35" y="45" width="30" height="15" rx="3" fill="#818cf8" />
            </svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    })
  });
};

export default RouteVisualizer;