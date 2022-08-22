import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  initialState: { display: false },
  name: 'admin',
  reducers: {
    admin(state) {
      state.display = true
    },
    close(state) {
      state.display = false
    },
  },
})

export const { admin, close } = adminSlice.actions
export default adminSlice.reducer
