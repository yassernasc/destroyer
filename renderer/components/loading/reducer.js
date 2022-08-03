import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { message: '' },
  reducers: {
    scanning(state, action) {
      state.message = action.payload
    },
    reset(state) {
      state.message = ''
    }
  }
})

export const { scanning, reset } = loadingSlice.actions
export default loadingSlice.reducer