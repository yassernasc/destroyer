import { createSlice } from '@reduxjs/toolkit'

export const playerStatus = {
  paused: 'paused',
  playing: 'playing',
  stopped: 'stopped',
}
const { paused, playing, stopped } = playerStatus

const initialState = { status: stopped, albumId: null, trackNumber: null, secondsPlayed: 0 }

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playAlbum(state, action) {
      state.albumId = action.payload
      state.trackNumber = 1
      state.status = playing
    },
    playTrack(state, action) {
      state.albumId = action.payload.albumId
      state.trackNumber = action.payload.trackNumber
      state.status = playing
    },
    toggle(state) {
      state.status = state.status === playing ? paused : playing
    },
    next(state) {
      state.trackNumber++
      if (state.status !== playing) {
        state.status = playing
      }
    },
    previous(state) {
      state.trackNumber--
      if (state.status !== playing) {
        state.status = playing
      }
    },
    tick(state, action) {
      state.secondsPlayed = action.payload
    },
    stop(state) {
      return initialState
    },
  }
})

const previousTrack = () => (dispatch, getState) => {
  const { trackNumber } = getState().player
  const isFirstTrack = trackNumber === 1
  dispatch(isFirstTrack ? stop() : previous())
}

const nextTrack = () => (dispatch, getState) => {
  const state = getState()
  const playingAlbumId = state.player.albumId
  const album = state.library.find(album => album.id === playingAlbumId)
  const lastTrack = [...album.tracks].pop()
  const isPlayingLastTrack = lastTrack.trackNumber === state.player.trackNumber

  dispatch(isPlayingLastTrack ? stop() : next())
}

const { playAlbum, playTrack, tick, toggle, next, previous, stop } = playerSlice.actions
export { playAlbum, playTrack, tick, toggle, nextTrack, previousTrack, stop }
export default playerSlice.reducer
