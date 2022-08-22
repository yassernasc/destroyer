import { usePlayerStatus, usePlayerTime, usePlayingTrack } from '.'
import { floor } from '../utils/seconds'
import { playerStatus } from '../reducers/player'

export const useRemainingTime = () => {
  const time = usePlayerTime()
  const status = usePlayerStatus()
  const track = usePlayingTrack()

  if (status === playerStatus.stopped) {
    return ''
  }

  const remainingTime = floor(track.duration) - floor(time)

  if (remainingTime === 0) {
    return '- 00:00:00'
  }

  const hours = floor(remainingTime / 60 / 60)
    .toString()
    .padStart(2, '0')
  const minutes = floor((remainingTime / 60) % 60)
    .toString()
    .padStart(2, '0')
  const seconds = floor(floor(remainingTime % 60))
    .toString()
    .padStart(2, '0')

  return `- ${hours}:${minutes}:${seconds}`
}
