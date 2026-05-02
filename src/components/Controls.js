import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNumDisks, nextStep, resetGame, setAutoPlaying } from '../redux/hanoiSlice';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import { PlayFill, SkipForwardFill, ArrowCounterclockwise, PauseFill } from 'react-bootstrap-icons';

const Controls = () => {
  const dispatch = useDispatch();
  const { numDisks, isAutoPlaying, currentStep, moveHistory } = useSelector((state) => state.hanoi);

  useEffect(() => {
    let timer;
    if (isAutoPlaying && currentStep < moveHistory.length - 1) {
      timer = setTimeout(() => {
        dispatch(nextStep());
      }, 700);
    } else if (currentStep === moveHistory.length - 1) {
      dispatch(setAutoPlaying(false));
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStep, moveHistory.length, dispatch]);

  const [inputValue, setInputValue] = React.useState(numDisks);
  const [error, setError] = React.useState('');

  useEffect(() => {
    setInputValue(numDisks);
  }, [numDisks]);

  const handleNumChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === '') { setError(''); return; }
    const n = parseInt(val);
    if (isNaN(n)) { setError('Invalid number'); } 
    else if (n < 3) { setError('Minimum 3 disks'); } 
    else if (n > 10) { setError('Maximum 10 disks'); } 
    else { setError(''); dispatch(setNumDisks(n)); }
  };

  const progress = ((currentStep + 1) / moveHistory.length) * 100;

  return (
    <div className="card-custom p-4 mb-4 text-white">
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label className="text-secondary fw-bold mb-2">Number of Disks:</Form.Label>
          <Form.Control
            type="number"
            value={inputValue}
            onChange={handleNumChange}
            isInvalid={!!error}
            className="bg-dark text-white border-secondary"
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
      </Form>

      <div className="d-grid gap-2 mb-4">
        <Button
          variant={isAutoPlaying ? "warning" : "primary"}
          size="lg"
          onClick={() => dispatch(setAutoPlaying(!isAutoPlaying))}
          disabled={currentStep === moveHistory.length - 1}
          className="fw-bold d-flex align-items-center justify-content-center gap-2"
        >
          {isAutoPlaying ? <PauseFill size={20} /> : <PlayFill size={20} />}
          {isAutoPlaying ? 'Pause' : 'Auto-play'}
        </Button>

        <div className="d-flex gap-2">
          <Button
            variant="outline-info"
            className="flex-grow-1 fw-bold"
            onClick={() => dispatch(nextStep())}
            disabled={isAutoPlaying || currentStep === moveHistory.length - 1}
          >
            <SkipForwardFill className="me-1" /> Next
          </Button>
          <Button
            variant="outline-danger"
            className="flex-grow-1 fw-bold"
            onClick={() => dispatch(resetGame())}
          >
            <ArrowCounterclockwise className="me-1" /> Reset
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="text-secondary small">Total Moves:</span>
        <span className="h5 mb-0 text-info fw-bold">{Math.pow(2, numDisks) - 1}</span>
      </div>

      <ProgressBar now={progress} variant="info" className="bg-dark" style={{ height: '8px' }} />
    </div>
  );
};

export default Controls;
