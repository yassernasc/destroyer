import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const selectFilteredLibrary = createSelector(
  state => state.library,
  state => state.filter.title,
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

export const useFilteredLibrary = () => useSelector(selectFilteredLibrary)
