import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  initialState: { message: '' },
  name: 'loading',
  reducers: {
    reset(state) {
      state.message = ''
    },
    scanning(state, action) {
      state.message = action.payload
    },
  },
})

export const { scanning, reset } = loadingSlice.actions
export default loadingSlice.reducer
