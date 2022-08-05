import { useSelector } from 'react-redux'

const selectFilter = state => state.filter.title
export const useFilter = () => useSelector(selectFilter)
