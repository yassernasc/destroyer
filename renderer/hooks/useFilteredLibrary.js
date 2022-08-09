import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const selectFilteredLibrary = createSelector(
  state => state.library.albums,
  state => state.library.filter,
  (albums, filter) => {
    const albumList = Object.values(albums)
    const filterAlbums = () => {
      return albumList.filter(album => {
        const match = (a, b) => a.toLowerCase().includes(b.toLowerCase())
        return match(album.title, filter) || match(album.artist, filter)
      })
    }

    return filter === '' ? albumList : filterAlbums()
  }
)

export const useFilteredLibrary = () => useSelector(selectFilteredLibrary)
