import React from 'react';
import { motion } from 'framer-motion';

const Disk = ({ size, totalDisks }) => {
  const colors = [
    '#0d6efd', // Primary Blue
    '#198754', // Success Green
    '#dc3545', // Danger Red
    '#ffc107', // Warning Yellow
    '#6610f2', // Indigo
    '#fd7e14', // Orange
    '#20c997', // Teal
    '#d63384', // Pink
  ];
  
  const backgroundColor = colors[(size - 1) % colors.length]; // the disk color is based on the disk size 
  const width = `${(size / totalDisks) * 80 + 20}%`; // sizes= number of any disk 

  return (
    <motion.div
      layout    // makes it  smooth animated when it moves
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        layout: { duration: 0.6 }
      }}
      className="disk-item"
      style={{             // the style dynamicly change based on the disk size and number of disks 
        backgroundColor,
        width,
        zIndex: size,
      }}
    >
      {size}
    </motion.div>
  );
};

export default Disk;
