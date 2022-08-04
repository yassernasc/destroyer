import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const selectShowcase = state => state.showcase.albumId
const selectIsShowcasePlaying = createSelector(
  selectShowcase,
  state => state.player.albumId,
  (showcaseAlbumId, albumId) => showcaseAlbumId === albumId
)

export const useIsShowcasePlaying = () => useSelector(selectIsShowcasePlaying)
