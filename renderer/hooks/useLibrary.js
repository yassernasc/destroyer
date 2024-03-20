import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { selectAlbums } from './useAlbums'
import { selectFilter } from './useFilter'
import { sortAlbums } from '../utils/sorting'

// string helpers for the filter feature
const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const transform = str => removeAccents(str).toLowerCase()
const match = (a, b) => transform(a).includes(transform(b))

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
      return albums.filter(
        album => match(album.title, filter) || match(album.artist, filter)
      )
    }

    return filter === '' ? albums : filterAlbums()
  }
)

export const useLibrary = () => useSelector(selectSortedAndFilteredAlbums)
