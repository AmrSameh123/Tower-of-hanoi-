import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNumDisks } from '../redux/hanoiSlice';
import { Container, Row, Col, Modal, Button, ListGroup } from 'react-bootstrap';
import Peg from './Peg';
import Controls from './Controls';
import LogPanel from './LogPanel';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const TowerOfHanoi = () => {
  const dispatch = useDispatch();
  const { pegs, numDisks, isSuccess, moveHistory } = useSelector((state) => state.hanoi);

  useEffect(() => {
    dispatch(setNumDisks(numDisks));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      confetti({  // colors of the confetti that appears when the puzzle is solved 
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0d6efd', '#198754', '#dc3545', '#ffc107']
      });
    }
  }, [isSuccess]);

  return (
    <Container fluid className="py-5 bg-dark min-vh-100 text-white">
      <Row className="justify-content-center mb-5">
        <Col lg={10} className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-4 fw-bold text-info mb-3"
          >
            Tower of Hanoi
          </motion.h1>
          <p className="lead text-secondary">
            Recursive simulation. Watch the disks move to the target peg.
          </p>
        </Col>
      </Row>

      <Row className="g-4 px-4">
        {/* Visualization Section */}
        <Col lg={8}>
          <div className="card-custom p-5 mb-4 bg-dark-secondary">
            <Row className="align-items-end justify-content-around">
              <Col xs={4}><Peg label="Peg A" disks={pegs.A} totalDisks={numDisks} /></Col>
              <Col xs={4}><Peg label="Peg B" disks={pegs.B} totalDisks={numDisks} /></Col>
              <Col xs={4}><Peg label="Peg C" disks={pegs.C} totalDisks={numDisks} /></Col>
            </Row>
          </div>
        </Col>

        {/* Controls Section */}
        <Col lg={4}>
          <Controls />
          <LogPanel />
        </Col>
      </Row>

      {/* Success Modal with All Steps */}
      <Modal 
        show={isSuccess} 
        onHide={() => dispatch(setNumDisks(numDisks))}
        centered
        size="lg"
        contentClassName="bg-dark text-white border-info shadow-lg"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title className="text-info fw-bold">Simulation Complete!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="text-success mb-2">Well Done!</h2>
            <p className="text-secondary">The puzzle was solved in {moveHistory.length} moves.</p>
          </div>
          
          <h5 className="text-info mb-3">Move History:</h5>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }} className="pe-2 custom-scrollbar">
            <ListGroup variant="flush">
              {moveHistory.map((move, index) => (
                <ListGroup.Item key={index} className="bg-transparent border-secondary text-light py-2">
                  <span className="text-info fw-bold me-3">#{index + 1}</span>
                  Move disk <span className="text-warning fw-bold">{move.disk}</span> from 
                  <span className="badge bg-secondary mx-2">{move.from}</span> to 
                  <span className="badge bg-primary mx-2">{move.to}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-secondary">
          <Button variant="info" className="w-100 fw-bold py-2" onClick={() => dispatch(setNumDisks(numDisks))}>
            Start New Simulation
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TowerOfHanoi;
