import { useSelector } from 'react-redux'

export const useAccentColor = () => useSelector(state => state.theme.accent)
