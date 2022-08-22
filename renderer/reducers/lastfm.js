import { createSlice } from '@reduxjs/toolkit'

const lastfmSlice = createSlice({
  initialState: { key: null, scrobble: false },
  name: 'lastfm',
  reducers: {
    signIn(state, action) {
      state.key = action.payload
      state.scrobble = true
    },
    signOut(state) {
      state.key = null
      state.scrobble = false
    },
    updateScrobblingToogle(state, action) {
      state.scrobble = action.payload.scrobble
    },
  },
})

export const { signOut, signIn, updateScrobblingToogle } = lastfmSlice.actions
export default lastfmSlice.reducer
