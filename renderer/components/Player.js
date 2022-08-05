import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Playbar } from './Playbar'
import { usePlayingTrack } from '../hooks/usePlayingTrack'
import { usePlayerStatus } from '../hooks/usePlayerStatus'
import { nextTrack, playerStatus, tick } from '../reducers/player'

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
    if (status === playerStatus.playing) play()
    if (status === playerStatus.paused) pause()
  }, [status])

  const play = () => {
    if (audioEl.current.src) audioEl.current.play()
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
