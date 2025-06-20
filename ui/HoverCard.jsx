import React from 'react';
import { motion } from 'framer-motion';

const HoverCard = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  glowColor = 'rgba(139, 92, 246, 0.3)'
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
      whileHover={hoverEffect ? { 
        y: -8,
        boxShadow: `0 25px 50px -12px ${glowColor}`
      } : {}}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;