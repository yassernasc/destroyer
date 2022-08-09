import { useSelector } from 'react-redux'

export const usePlayerStatus = () => useSelector(state => state.player.status)
