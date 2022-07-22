import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { selectFilter } from '../keyboard/useFilter'
import { selectShowcase } from '../showcase/useShowcase'

const selectLibrary = state => state.library

const selectCurrentAlbum = createSelector(
  selectLibrary,
  state => state.player.albumId,
  (albums, albumId) => albums.find(album => album.id === albumId)
)

const selectCurrentTrack = createSelector(
  selectLibrary,
  state => state.player.albumId,
  state => state.player.trackNumber,
  (albums, albumId, trackNumber) => {
    if (!albumId || !trackNumber) {
      return null
    }

    return albums
      .find(album => album.id === albumId).tracks
      .find(track => track.trackNumber === trackNumber)
  }
)

const selectFilteredLibrary = createSelector(
  selectLibrary,
  selectFilter,
  (albums, filter) => {
    const filterAlbums = () => {
      return albums.filter(album => {
        const match = (a, b) => a.toLowerCase().includes(b.toLowerCase())
        return match(album.title, filter) || match(album.artist, filter)
      })
    }

    return filter === '' ? albums : filterAlbums()
  }
)

const selectShowcaseAlbum = createSelector(
  selectLibrary,
  selectShowcase,
  (albums, albumId) => {
    return albumId === null ? null : albums.find((album) => albumId === album.id)
  }
)

export const useCurrentTrack = () => useSelector(selectCurrentTrack)
export const useCurrentAlbum = () => useSelector(selectCurrentAlbum)
export const useFilteredLibrary = () => useSelector(selectFilteredLibrary)
export const useShowcaseAlbum = () => useSelector(selectShowcaseAlbum)