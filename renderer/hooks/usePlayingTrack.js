import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const selectCurrentTrack = createSelector(
  state => state.library,
  state => state.player.albumId,
  state => state.player.trackNumber,
  (albums, albumId, trackNumber) => {
    if (!albumId || !trackNumber) {
      return null
    }

    return albums
      .find(album => album.id === albumId)
      .tracks.find(track => track.trackNumber === trackNumber)
  }
)

export const usePlayingTrack = () => useSelector(selectCurrentTrack)
