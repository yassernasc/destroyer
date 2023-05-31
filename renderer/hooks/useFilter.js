import { useSelector } from 'react-redux'

export const selectFilter = state => state.library.filter
export const useFilter = () => useSelector(selectFilter)
