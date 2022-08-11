import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { nextTrack, playerStatus, tick } from '../reducers/player'
import {
  useMediaSession,
  usePlayerStatus,
  usePlayerToggle,
  usePlayingTrack,
  useTouchBar,
  useUpdateTick,
} from '../hooks'
import { Playbar } from './Playbar'

export const Player = () => {
  const dispatch = useDispatch()
  const audioEl = useRef(null)
  const track = usePlayingTrack()
  const status = usePlayerStatus()
  usePlayerToggle()
  useTouchBar()
  useUpdateTick(audioEl.current)

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

  const play = () => audioEl.current.play()
  const pause = () => audioEl.current.pause()

  return (
    <>
      <audio id="xxx" ref={audioEl} />
      <Playbar updateTime={updateCurrentTime} />
    </>
  )
}
