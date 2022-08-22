import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  initialState: { message: '' },
  name: 'notification',
  reducers: {
    clear(state) {
      state.message = ''
    },
    notify(state, action) {
      state.message = action.payload
    },
  },
})

const scanUpdate = metadata => (dispatch, getState) => {
  const { scanning } = getState().library
  if (scanning) {
    dispatch(notify(`SCANNING: ${metadata.artist} - ${metadata.album}`))
  }
}

const toast = message => dispatch => {
  dispatch(notify(message))
  setTimeout(() => dispatch(clear()), 1000)
}

const { clear, notify } = notificationSlice.actions
export { clear, scanUpdate, toast }
export default notificationSlice.reducer
