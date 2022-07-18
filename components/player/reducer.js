import { store } from '../../client.js'

export const playerStatus = {
  paused: 'paused',
  playing: 'playing',
  stopped: 'stopped',
}

const initialState = { status: playerStatus.stopped, albumId: null, trackNumber: null }

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAY_ALBUM': {
      state = {
        albumId: action.albumId,
        trackNumber: 1,
        status: playerStatus.playing
      }
      break
    }
    case 'PLAY_TRACK': {
      state = {
        albumId: action.albumId,
        trackNumber: action.trackNumber,
        status: playerStatus.playing
      }
      break
    }
    case 'TOGGLE': {
      const newStatus = state.status === playerStatus.playing ? playerStatus.paused : playerStatus.playing
      state = { ...state, status: newStatus }
      break
    }
    case 'NEXT': {
      state = {
        ...state,
        trackNumber: state.trackNumber + 1,
        status: playerStatus.playing
      }
      break
    }
    case 'PREVIOUS': {
      state = {
        ...state,
        trackNumber: state.trackNumber - 1,
        status: playerStatus.playing
      }
      break
    }
    case 'STOP': {
      state = initialState
      break
    }
  }
  return state
}
