import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { close } from './showcase'
import { stop } from './player'

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
    clearFilter(state) {
      state.filter = ''
    },
    filter(state, action) {
      state.filter = action.payload
    },
  },
})

const scan = createAsyncThunk(
  'library/scan',
  (paths, { dispatch, getState }) => {
    dispatch(stop())
    dispatch(close())

    if (!paths) {
      paths = getState().library.paths
    }

    return window.local.scan(paths)
  }
)

export { scan }
export const { clearFilter, filter } = librarySlice.actions
export default librarySlice.reducer
