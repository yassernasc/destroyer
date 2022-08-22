import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const librarySlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(search.pending, state => {
        state.scanning = true
      })
      .addCase(search.fulfilled, (state, action) => {
        const { albums, tracks } = action.payload
        state.albums = albums
        state.tracks = tracks
        state.scanning = false
      })
  },
  initialState: {
    albums: {},
    filter: '',
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

const search = createAsyncThunk('library/search', window.local.search)

export { search }
export const { clearFilter, filter } = librarySlice.actions
export default librarySlice.reducer
