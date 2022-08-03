import { createSlice } from '@reduxjs/toolkit'

const showcaseSlice = createSlice({
  name: 'showcase',
  initialState: { albumId: null },
  reducers: {
    showcase(state, action) {
      state.albumId = action.payload
    },
    close(state) {
      state.albumId = null
    }
  }
})

export const { showcase, close } = showcaseSlice.actions
export default showcaseSlice.reducer
