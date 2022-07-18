import { store } from '../../client.js'

export const showcaseReducer = (state = { albumId: null }, action) => {
  switch (action.type) {
    case 'SHOWCASE': {
      state = { albumId: action.albumId }
      break
    }
    case 'CLOSE_SHOWCASE': {
      state = { albumId: null }
      break
    }
  }
  return state
}
