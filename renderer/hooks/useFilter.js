import { useSelector } from 'react-redux'

export const useFilter = () => useSelector(state => state.library.filter)
