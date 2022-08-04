import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  name: 'admin',
  initialState: { display: false },
  reducers: {
    admin(state) {
      state.display = !state.display
    },
    escape(state) {
      state.display = false
    },
    drop(state) {
      state.display = false
    },
  },
})

export const { admin, escape, drop } = adminSlice.actions
export default adminSlice.reducer
