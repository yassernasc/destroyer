import { createSlice } from '@reduxjs/toolkit'
import { reset } from '../loading/reducer'

const librarySlice = createSlice({
  name: 'library',
  initialState: [],
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
