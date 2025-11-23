import React from 'react';
import { motion } from 'framer-motion';
import './FlipCard.css';

const FlipCard = ({ front, back, className = '', onClick }) => {
  return (
    <motion.div
      className={`flip-card ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-hidden="false"
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </motion.div>
  );
};

export default FlipCard;
