import { useSelector } from 'react-redux'

const selectPlayerStatus = state => state.player.status
export const usePlayerStatus = () => useSelector(selectPlayerStatus)
