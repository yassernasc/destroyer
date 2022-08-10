import { usePlayerStatus, usePlayerTime, usePlayingTrack } from '.'
import { playerStatus } from '../reducers/player'

export const useRemainingTime = () => {
  const time = usePlayerTime()
  const status = usePlayerStatus()
  const track = usePlayingTrack()

  if (status === playerStatus.stopped) {
    return ''
  }

  const remainingTime = track.duration - time

  const hours = Math.floor(remainingTime / 60 / 60)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((remainingTime / 60) % 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.round(Math.floor(remainingTime % 60))
    .toString()
    .padStart(2, '0')

  return `- ${hours}:${minutes}:${seconds}`
}
