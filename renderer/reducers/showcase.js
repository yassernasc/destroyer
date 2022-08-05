import { createSlice } from '@reduxjs/toolkit'

const showcaseSlice = createSlice({
  initialState: { albumId: null },
  name: 'showcase',
  reducers: {
    close(state) {
      state.albumId = null
    },
    showcase(state, action) {
      state.albumId = action.payload
    },
  },
})

export const { showcase, close } = showcaseSlice.actions
export default showcaseSlice.reducer
