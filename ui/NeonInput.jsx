import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NeonInput = ({ 
  label, 
  icon: Icon,
  error,
  className = '',
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <motion.label
          className={`absolute left-3 px-1 bg-white transition-all duration-300 ${
            focused || props.value 
              ? 'top-0 text-xs text-indigo-600 -translate-y-1/2' 
              : 'top-1/2 text-gray-500 -translate-y-1/2'
          }`}
          animate={{
            color: focused || props.value ? '#6366f1' : '#6b7280'
          }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
            <Icon />
          </div>
        )}
        
        <motion.input
          className={`w-full py-3 ${Icon ? 'pl-10' : 'pl-4'} pr-4 bg-white border ${
            error 
              ? 'border-red-500' 
              : focused 
                ? 'border-indigo-500' 
                : 'border-gray-300'
          } rounded-xl shadow-sm focus:outline-none transition-all duration-300`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          animate={{
            boxShadow: focused 
              ? '0 0 15px rgba(99, 102, 241, 0.3)'
              : 'none'
          }}
          {...props}
        />
        
        {error && (
          <motion.div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </div>
      
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-600"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default NeonInput;