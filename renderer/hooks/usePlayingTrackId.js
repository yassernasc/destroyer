import { useSelector } from 'react-redux'

export const usePlayingTrackId = () => {
  const queue = useSelector(state => state.player.queue)
  const queueIndex = useSelector(state => state.player.queueIndex)

  return queue[queueIndex]
}
