import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimatedRoute = ({ children }) => {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          type: 'spring', 
          stiffness: 300, 
          damping: 25,
          duration: 0.5 
        } 
      }}
      exit={{ 
        opacity: 0, 
        y: -20,
        transition: { 
          ease: 'easeIn',
          duration: 0.3 
        } 
      }}
      transition={{
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9]
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedRoute;