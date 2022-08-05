import { createSlice } from '@reduxjs/toolkit'
import { reset } from './loading'

const librarySlice = createSlice({
  initialState: [],
  name: 'library',
  reducers: {
    connected(state, action) {
      return action.payload
    },
  },
})

const { connected } = librarySlice.actions
export const connect = library => dispatch => {
  dispatch(reset())
  dispatch(connected(library))
}
export default librarySlice.reducer
