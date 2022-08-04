import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const selectFilter = state => state.filter.title
const selectFilterActivated = createSelector(
  selectFilter,
  filter => filter !== ''
)

export const useFilter = () => useSelector(selectFilter)
export const useFilterActivated = () => useSelector(selectFilterActivated)
