import { useSelector } from 'react-redux'

export const useMessage = () => useSelector(state => state.library.scanningInfo)
