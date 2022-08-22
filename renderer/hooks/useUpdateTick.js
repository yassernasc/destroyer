import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { playerStatus, tick } from '../reducers/player'
import { formatSecondsTime } from '../utils/seconds'
import { usePlayerStatus } from '.'

export const useUpdateTick = audioRef => {
  const dispatch = useDispatch()
  const status = usePlayerStatus()

  useEffect(() => {
    let intervalId
    let lastTick

    if (audioRef.current && status === playerStatus.playing) {
      intervalId = setInterval(() => {
        const currentSeconds = formatSecondsTime(audioRef.current.currentTime)
        if (currentSeconds !== lastTick) {
          dispatch(tick(currentSeconds))
          lastTick = currentSeconds
        }
      }, 50)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [audioRef.current, status])
}
