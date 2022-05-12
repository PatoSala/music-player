import { configureStore } from '@reduxjs/toolkit'
import currentSongSlice from './Slices/currentSongSlice';
import queueSlice from './Slices/queueSlice';

export const store = configureStore({
  reducer: {
      currentSong: currentSongSlice,
      queue: queueSlice
  },
})