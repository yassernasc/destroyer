import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { nextTrack, playerStatus, tick } from '../reducers/player'
import { usePlayerStatus, usePlayingTrack } from '../hooks'
import { Playbar } from './Playbar'

export const Player = () => {
  const dispatch = useDispatch()
  const audioEl = useRef(null)
  const track = usePlayingTrack()
  const status = usePlayerStatus()

  useEffect(() => {
    audioEl.current.onended = () => dispatch(nextTrack())
    audioEl.current.ontimeupdate = () =>
      dispatch(tick(audioEl.current.currentTime))
  }, [audioEl])

  useEffect(() => {
    if (track) {
      audioEl.current.src = track.path
      play()
    }
  }, [track])

  useEffect(() => {
    if (status === playerStatus.playing) {
      play()
    }
    if (status === playerStatus.paused) {
      pause()
    }
  }, [status])

  const play = () => {
    if (audioEl.current.src) {
      audioEl.current.play()
    }
  }

  const pause = () => audioEl.current.pause()

  const updateCurrentTime = newTime => (audioEl.current.currentTime = newTime)

  return (
    <>
      <audio ref={audioEl} id="xxx" />
      <Playbar updateTime={updateCurrentTime} />
    </>
  )
}
