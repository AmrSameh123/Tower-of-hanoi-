import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const LogPanel = () => {
  const { moveHistory, currentStep } = useSelector((state) => state.hanoi);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentStep]);

  return (
    <div className="card-custom p-3 h-100">
      <h5 className="text-white fw-bold mb-3 border-bottom border-white/10 pb-2">
        Steps History
      </h5>
      
      <div 
        ref={scrollRef}
        className="scroll-area pe-2"
      >
        <ListGroup variant="flush">
          <AnimatePresence initial={false}>
            {moveHistory.slice(0, currentStep + 1).map((move, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ListGroup.Item 
                  className={`bg-transparent border-0 px-0 py-2 small ${
                    index === currentStep ? 'text-info fw-bold' : 'text-secondary'
                  }`}
                >
                  <span className="badge badge-step me-2">{index + 1}</span>
                  Disk {move.disk} : {move.from} → {move.to}
                </ListGroup.Item>
              </motion.div>
            ))}
          </AnimatePresence>
        </ListGroup>
        
        {currentStep === -1 && (
          <div className="text-center text-muted py-5 italic">
            Waiting for first move...
          </div>
        )}
      </div>
    </div>
  );
};

export default LogPanel;
