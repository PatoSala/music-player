import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: undefined,
}

export const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSong: (state, song) => {
        state.value = song;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentSong } = currentSongSlice.actions

export default currentSongSlice.reducer