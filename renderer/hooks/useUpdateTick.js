import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { playerStatus, tick } from '../reducers/player'
import { usePlayerStatus } from '.'

export const useUpdateTick = audioRef => {
  const dispatch = useDispatch()
  const status = usePlayerStatus()

  useEffect(() => {
    let intervalId
    let lastTick

    if (status === playerStatus.playing) {
      intervalId = setInterval(() => {
        const currentSeconds = Math.floor(audioRef.currentTime)
        if (currentSeconds !== lastTick) {
          dispatch(tick(currentSeconds))
          lastTick = currentSeconds
        }
      }, 100)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [status])
}
