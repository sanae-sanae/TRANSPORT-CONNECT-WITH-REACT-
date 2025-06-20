import React from 'react';
import { motion } from 'framer-motion';

const PulseBadge = ({ 
  count, 
  color = 'bg-red-500',
  size = 'w-6 h-6',
  textSize = 'text-xs'
}) => {
  return (
    <div className="relative">
      {count > 0 && (
        <>
          <motion.span 
            className={`absolute -top-2 -right-2 ${color} text-white rounded-full flex items-center justify-center ${size} ${textSize}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {count}
          </motion.span>
          
          <motion.span
            className={`absolute -top-2 -right-2 ${color} rounded-full opacity-40`}
            animate={{ 
              scale: [1, 1.8],
              opacity: [0.4, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{
              width: '1.5rem',
              height: '1.5rem'
            }}
          />
        </>
      )}
    </div>
  );
};

export default PulseBadge;