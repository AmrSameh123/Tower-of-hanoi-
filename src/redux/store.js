import { configureStore } from '@reduxjs/toolkit';
import hanoiReducer from './hanoiSlice';

export const store = configureStore({
  reducer: {
    hanoi: hanoiReducer,
  },
});
