import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { nextTrack, playerStatus, tick } from '../reducers/player'
import {
  useMediaSession,
  usePlayerStatus,
  usePlayerToggle,
  usePlayingTrack,
  useTouchBar,
} from '../hooks'
import { Playbar } from './Playbar'

export const Player = () => {
  const dispatch = useDispatch()
  const audioEl = useRef(null)
  const track = usePlayingTrack()
  const status = usePlayerStatus()
  usePlayerToggle()
  useTouchBar()

  const updateCurrentTime = time => {
    const newTime = Math.floor(time)
    audioEl.current.currentTime = newTime
    dispatch(tick(newTime))
  }

  useMediaSession(updateCurrentTime)

  useEffect(() => (audioEl.current.onended = () => dispatch(nextTrack())), [])

  useEffect(() => {
    if (track) {
      audioEl.current.src = track.path
      play()
    }
  }, [track])

  useEffect(() => {
    if (status === playerStatus.playing && audioEl.current.src) {
      play()
    }
    if (status === playerStatus.paused) {
      pause()
    }
  }, [status])

  useEffect(() => {
    let intervalId
    let lastTick

    if (status === playerStatus.playing) {
      intervalId = setInterval(() => {
        const currentSeconds = Math.floor(audioEl.current.currentTime)
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

  const play = () => audioEl.current.play()
  const pause = () => audioEl.current.pause()

  return (
    <>
      <audio id="xxx" ref={audioEl} />
      <Playbar updateTime={updateCurrentTime} />
    </>
  )
}
