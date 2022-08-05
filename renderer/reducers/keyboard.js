import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  initialState: { title: '' },
  name: 'filter',
  reducers: {
    escape(state) {
      state.title = ''
    },
    filter(state, action) {
      state.title = action.payload
    },
  },
})

export const { filter, escape } = filterSlice.actions
export default filterSlice.reducer
