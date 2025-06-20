import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emojis = [
  '😀', '😍', '😂', '👍', '👏', '❤️', '🔥', '🎉', '👀', '🤔',
  '😎', '🥳', '🤩', '😜', '🙌', '💯', '✨', '🌟', '💥', '💖'
];

const AnimatedEmoji = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl">😊</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-full right-0 bg-white rounded-xl shadow-xl z-50 p-3 w-64"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji, index) => (
                <motion.button
                  key={index}
                  className="text-xl p-2 hover:bg-gray-100 rounded-lg"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    onSelect(emoji);
                    setIsOpen(false);
                  }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedEmoji;