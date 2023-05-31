import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { selectAlbums } from './useAlbums'
import { selectShowcaseAlbumId } from './useShowcaseAlbum'
import { selectTracks } from './useTracks'
import { sortTracks } from '../utils/sorting'

const selectShowcaseTracks = createSelector(
  selectAlbums,
  selectShowcaseAlbumId,
  selectTracks,
  (albums, albumId, tracks) => {
    if (!albumId) {
      return []
    }

    const album = albums[albumId]
    const albumTracks = album.tracks.map(id => tracks[id])
    return sortTracks(albumTracks)
  }
)

export const useShowcaseTracks = () => useSelector(selectShowcaseTracks)
