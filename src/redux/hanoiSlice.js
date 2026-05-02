import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numDisks: 3,
  pegs: {
    A: [3, 2, 1],
    B: [],
    C: [],
  },
  moveHistory: [],
  currentStep: -1,
  isAutoPlaying: false,
  isSuccess: false,
};

const solveHanoi = (n, from, to, aux, moves) => {
  if (n === 1) {
    moves.push({ disk: 1, from, to });
    return;
  }
  solveHanoi(n - 1, from, aux, to, moves);
  moves.push({ disk: n, from, to });
  solveHanoi(n - 1, aux, to, from, moves);
};

const hanoiSlice = createSlice({
  name: 'hanoi',
  initialState,
  reducers: {
    setNumDisks: (state, action) => {
      const n = parseInt(action.payload);
      if (isNaN(n) || n < 1) return;
      
      state.numDisks = n;
      state.pegs = {
        A: Array.from({ length: n }, (_, i) => n - i),
        B: [],
        C: [],
      };
      const moves = [];
      solveHanoi(n, 'A', 'C', 'B', moves);
      state.moveHistory = moves;
      state.currentStep = -1;
      state.isAutoPlaying = false;
      state.isSuccess = false;
    },
    nextStep: (state) => {
      if (state.currentStep < state.moveHistory.length - 1) {
        state.currentStep += 1;
        const { from, to } = state.moveHistory[state.currentStep];
        const disk = state.pegs[from].pop();
        state.pegs[to].push(disk);

        if (state.pegs.C.length === state.numDisks) {
          state.isSuccess = true;
          state.isAutoPlaying = false;
        }
      }
    },
    resetGame: (state) => {
      const n = state.numDisks;
      state.pegs = {
        A: Array.from({ length: n }, (_, i) => n - i),
        B: [],
        C: [],
      };
      state.currentStep = -1;
      state.isAutoPlaying = false;
      state.isSuccess = false;
    },
    setAutoPlaying: (state, action) => {
      state.isAutoPlaying = action.payload;
    },
  },
});

export const { setNumDisks, nextStep, resetGame, setAutoPlaying } = hanoiSlice.actions;
export default hanoiSlice.reducer;
