const path = require('path')
import { sortTracks, sortAlbums } from '../utilities'
import { store } from '../../client.js'

export const libraryReducer = (
  state = { albums: [] },
  action
) => {
  switch (action.type) {
    case 'CONNECTED': {
      state = { albums: action.albums }
      break
    }
  }
  return state
}
