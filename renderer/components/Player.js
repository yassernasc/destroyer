import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { nextTrack, playerStatus, tick } from '../reducers/player'
import {
  useDynamicColor,
  useLastfm,
  useMediaSession,
  usePlayerStatus,
  usePlayerTime,
  usePlayerToggle,
  usePlayingTrack,
  useTouchBar,
  useUpdateTick,
} from '../hooks'
import { Playbar } from './Playbar'
import { floor } from '../utils/seconds'

export const Player = () => {
  const dispatch = useDispatch()
  const audioEl = useRef(null)
  const track = usePlayingTrack()
  const status = usePlayerStatus()
  const time = usePlayerTime()

  usePlayerToggle()
  useTouchBar()
  useLastfm()
  useDynamicColor()
  useUpdateTick(audioEl)

  const updateCurrentTime = time => {
    const newTime = floor(time)
    audioEl.current.currentTime = newTime
    dispatch(tick(newTime))
  }

  useMediaSession(updateCurrentTime)

  useEffect(() => {
    if (time !== 0) {
      updateCurrentTime(time)
    }
  }, [])

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
