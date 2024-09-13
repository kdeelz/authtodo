import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../css/Alert.css'; // Importing CSS for additional styling

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Automatically close the alert after 3 seconds
    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={`alert ${type}`} // Class to set success or error styles
    >
      {message}
    </motion.div>
  );
};

export default Alert;
