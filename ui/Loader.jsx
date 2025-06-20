
import React from 'react';

export default function Loader({ fullScreen }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'h-screen' : ''}`}>
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
