import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: new Array(),
}

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    addToQueue: (state, songData) => {
        state.value = [...state.value, songData.payload];
        console.log(state.value);
    },
    removeFirstFromQueue: (state) => {
      state.value.shift();
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToQueue, removeFirstFromQueue } = queueSlice.actions

export default queueSlice.reducer