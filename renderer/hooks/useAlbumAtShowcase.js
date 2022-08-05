import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const selectShowcaseAlbum = createSelector(
  state => state.library,
  state => state.showcase.albumId,
  (albums, albumId) => {
    return albumId === null ? null : albums.find(album => albumId === album.id)
  }
)

export const useAlbumAtShowcase = () => useSelector(selectShowcaseAlbum)
