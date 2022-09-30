import { useSelector } from 'react-redux'

export const useTheme = () => useSelector(state => state.theme)
