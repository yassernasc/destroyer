import { useSelector } from 'react-redux'

const selectPlayerTime = state => state.player.secondsPlayed
export const usePlayerTime = () => useSelector(selectPlayerTime)
