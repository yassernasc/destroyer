import { createSlice } from '@reduxjs/toolkit'

import { resetAccent, updateAccentByAlbumCover } from './theme'

export const playerStatus = {
  paused: 'paused',
  playing: 'playing',
  stopped: 'stopped',
}
const { paused, playing, stopped } = playerStatus

const initialState = {
  queue: [],
  queueIndex: null,
  secondsPlayed: 0,
  status: stopped,
}

const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    next(state) {
      state.queueIndex++
      if (state.status !== playing) {
        state.status = playing
      }
    },
    playIndex(state, action) {
      state.queueIndex = action.payload
      if (state.status !== playing) {
        state.status = playing
      }
    },
    playQueue(state, action) {
      state.queue = action.payload.queue
      state.queueIndex = action.payload.queueIndex
      if (state.status !== playing) {
        state.status = playing
      }
    },
    previous(state) {
      state.queueIndex--
      if (state.status !== playing) {
        state.status = playing
      }
    },
    stopPlayer(state) {
      state.queue = []
      state.queueIndex = null
      state.status = stopped
      state.secondsPlayed = 0
    },
    tick(state, action) {
      state.secondsPlayed = action.payload
    },
    toggle(state) {
      state.status = state.status === playing ? paused : playing
    },
  },
})

const previousTrack = () => (dispatch, getState) => {
  const { queueIndex } = getState().player
  const isFirstTrack = queueIndex === 0

  dispatch(isFirstTrack ? stop() : previous())
}

const nextTrack = () => (dispatch, getState) => {
  const { queue, queueIndex } = getState().player
  const isLastTrack = queueIndex === queue.length - 1

  dispatch(isLastTrack ? stop() : next())
}

const playTrack = trackId => (dispatch, getState) => {
  const { queue } = getState().player
  const indexInQueue = queue.indexOf(trackId)

  if (indexInQueue !== -1) {
    dispatch(playIndex(indexInQueue))
  } else {
    // not in the current queue, so, play album
    const { albums, tracks } = getState().library
    const album = albums[tracks[trackId].albumId]
    const trackIndex = album.tracks.indexOf(trackId)

    dispatch(playAlbum(album.id, trackIndex))
  }
}

const playAlbum =
  (albumId, index = 0) =>
  (dispatch, getState) => {
    const { cover, tracks } = getState().library.albums[albumId]
    dispatch(playQueue({ queue: tracks, queueIndex: index }))
    dispatch(updateAccentByAlbumCover(cover))
  }

const stop = () => dispatch => {
  dispatch(stopPlayer())
  dispatch(resetAccent())
}

const { playIndex, playQueue, tick, toggle, next, previous, stopPlayer } =
  playerSlice.actions
export { playAlbum, playTrack, nextTrack, previousTrack, stop, tick, toggle }
export default playerSlice.reducer
