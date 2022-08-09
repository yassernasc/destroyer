import { useSelector } from 'react-redux'

export const usePlayerTime = () =>
  useSelector(state => state.player.secondsPlayed)
