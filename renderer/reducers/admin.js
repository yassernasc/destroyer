import { createSlice } from '@reduxjs/toolkit'

const adminSlice = createSlice({
  initialState: { display: false },
  name: 'admin',
  reducers: {
    admin(state) {
      state.display = !state.display
    },
    drop(state) {
      state.display = false
    },
    escape(state) {
      state.display = false
    },
  },
})

export const { admin, escape, drop } = adminSlice.actions
export default adminSlice.reducer
