import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { playerStatus, stop } from './player'
import { close } from './showcase'

const librarySlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(scan.pending, (state, action) => {
        if (action.meta.arg) {
          state.paths = action.meta.arg
        }
        state.scanning = true
      })
      .addCase(scan.fulfilled, (state, action) => {
        const { albums, tracks } = action.payload
        state.albums = albums
        state.tracks = tracks
        state.scanning = false
      })
  },
  initialState: {
    albums: {},
    filter: '',
    paths: [],
    scanning: false,
    tracks: {},
  },
  name: 'library',
  reducers: {
    applyFilter(state, action) {
      state.filter = action.payload
    },
    clearFilter(state) {
      state.filter = ''
    },
  },
})

const scan = createAsyncThunk(
  'library/scan',
  (paths, { dispatch, getState }) => {
    const { showcase, player } = getState()

    if (showcase.albumId !== null) {
      dispatch(close())
    }

    if (player.status !== playerStatus.stopped) {
      dispatch(stop())
    }

    if (!paths) {
      paths = getState().library.paths
    }

    return window.local.scan(paths)
  }
)

const filter = str => (dispatch, getState) => {
  dispatch(applyFilter(str))

  const { albumId } = getState().showcase
  if (albumId) {
    dispatch(close())
  }
}

export { scan }

const { applyFilter, clearFilter } = librarySlice.actions
export { filter, clearFilter }
export default librarySlice.reducer
