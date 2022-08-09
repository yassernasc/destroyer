import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const librarySlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(search.pending, state => {
        state.searching = true
      })
      .addCase(search.fulfilled, (state, action) => {
        state.searching = false
        state.scanningInfo = ''

        const { albums, tracks } = action.payload
        state.albums = albums
        state.tracks = tracks
      })
  },
  initialState: {
    albums: {},
    filter: '',
    scanningInfo: '',
    searching: false,
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
    scanning(state, action) {
      if (state.searching) {
        state.scanningInfo = action.payload
      }
    },
  },
})

const search = createAsyncThunk('library/search', pathList =>
  window.local.search(pathList)
)

export { search }
export const { clearFilter, filter, scanning } = librarySlice.actions
export default librarySlice.reducer
