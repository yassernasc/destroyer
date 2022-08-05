import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: { title: '' },
  reducers: {
    filter(state, action) {
      state.title = action.payload
    },
    escape(state) {
      state.title = ''
    },
  },
})

export const { filter, escape } = filterSlice.actions
export default filterSlice.reducer
