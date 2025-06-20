import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiPackage, FiMapPin, FiNavigation, FiBox } from 'react-icons/fi';

const FloatingIcons = () => {
  const icons = [
    { icon: FiTruck, size: 40, color: 'text-indigo-400', top: '10%', left: '5%', delay: 0 },
    { icon: FiPackage, size: 32, color: 'text-purple-400', top: '25%', left: '85%', delay: 0.3 },
    { icon: FiMapPin, size: 28, color: 'text-pink-400', top: '65%', left: '15%', delay: 0.6 },
    { icon: FiNavigation, size: 36, color: 'text-blue-400', top: '80%', left: '75%', delay: 0.9 },
    { icon: FiBox, size: 24, color: 'text-green-400', top: '40%', left: '20%', delay: 1.2 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute opacity-30"
          style={{ top: item.top, left: item.left }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 0.3,
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
        >
          <item.icon 
            className={`${item.color}`} 
            size={item.size} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;