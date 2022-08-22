import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { playerStatus, tick } from '../reducers/player'
import { usePlayerStatus, usePlayingTrack } from '.'
import { floor } from '../utils/seconds'

export const useUpdateTick = audioRef => {
  const dispatch = useDispatch()
  const status = usePlayerStatus()
  const track = usePlayingTrack()

  useEffect(() => {
    let intervalId
    let lastTick

    if (audioRef.current && status === playerStatus.playing) {
      intervalId = setInterval(() => {
        const currentSeconds = floor(audioRef.current.currentTime)
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
  }, [audioRef.current, track, status])
}
