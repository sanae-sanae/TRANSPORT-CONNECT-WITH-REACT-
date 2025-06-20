import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  loading = false,
  icon: Icon
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
    secondary: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
    danger: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
    outline: 'border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50'
  };

  return (
    <motion.button
      className={`${variants[variant]} text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-300 ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
      } flex items-center justify-center`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {loading ? (
        <span className="flex items-center">
          <span className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></span>
          Chargement...
        </span>
      ) : (
        <>
          {Icon && <Icon className="mr-2" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default GradientButton;