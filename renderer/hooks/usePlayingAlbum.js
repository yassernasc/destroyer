import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const selectCurrentAlbum = createSelector(
  state => state.library,
  state => state.player.albumId,
  (albums, albumId) => albums.find(album => album.id === albumId)
)

export const usePlayingAlbum = () => useSelector(selectCurrentAlbum)
