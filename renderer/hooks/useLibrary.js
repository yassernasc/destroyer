import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { selectAlbums } from './useAlbums'
import { selectFilter } from './useFilter'
import { sortAlbums } from '../utils/sorting'

const selectSortingCriteria = state => state.library.sortingCriteria
const selectSortedAlbums = createSelector(
  selectAlbums,
  selectSortingCriteria,
  (albums, criteria) => {
    const albumList = Object.values(albums)
    return sortAlbums(albumList, criteria.album)
  }
)

const selectSortedAndFilteredAlbums = createSelector(
  selectSortedAlbums,
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

export const useLibrary = () => useSelector(selectSortedAndFilteredAlbums)
