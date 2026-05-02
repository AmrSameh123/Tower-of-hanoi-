import React from 'react';
import Disk from './Disk';

const Peg = ({ label, disks, totalDisks }) => {
  return (
    <div className="peg-container">
      <div className="peg-rod" />
      <div className="peg-base" />
      
      <div className="disks-stack">
        {disks.map((size) => (
          <Disk key={size} size={size} totalDisks={totalDisks} />
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <h5 className="fw-bold text-secondary">{label}</h5>
      </div>
    </div>
  );
};

export default Peg;
