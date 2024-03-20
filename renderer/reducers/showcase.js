import { createSlice } from '@reduxjs/toolkit'

const showcaseSlice = createSlice({
  initialState: { albumId: null },
  name: 'showcase',
  reducers: {
    close(state) {
      state.albumId = null
    },
    showcase(state, action) {
      state.albumId = action.payload
    },
  },
})

const toggleShowcase = playingIAlbumd => (dispatch, getState) => {
  const { albumId } = getState().showcase

  if (albumId) {
    dispatch(close())
  } else if (playingIAlbumd) {
    dispatch(showcase(playingIAlbumd))
  }
}

export const { showcase, close } = showcaseSlice.actions
export { toggleShowcase }
export default showcaseSlice.reducer
