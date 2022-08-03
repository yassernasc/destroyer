import { remote } from 'electron'
import { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useCurrentTrack } from '../library/useLibrary'
import { nextTrack, playerStatus, tick } from './reducer'
import { usePlayerStatus } from './usePlayer'
import Playbar from '../playbar'

const Player = () => {
  const dispatch = useDispatch()
  const audioEl = useRef(null)
  const currentTrack = useCurrentTrack()
  const status = usePlayerStatus()

  useEffect(() => {
    audioEl.current.onended = () => dispatch(nextTrack())
    audioEl.current.ontimeupdate = () => {
      dispatch(tick(audioEl.current.currentTime))
    }
  }, [audioEl])

  useEffect(() => {
    if (currentTrack) {
      audioEl.current.src = currentTrack.path
      play()
    }
  }, [currentTrack])

  useEffect(() => {
    if (status === playerStatus.playing) play()
    if (status === playerStatus.paused) pause()
  }, [status])

  const play = () => {
    if (audioEl.current.src) audioEl.current.play()
  }

  const pause = () => audioEl.current.pause()

  const updateCurrentTime = (newTime) => audioEl.current.currentTime = newTime

  return (
    <>
      <audio ref={audioEl} id="xxx" />
      <Playbar updateTime={updateCurrentTime} />
    </>
  )
}

export default Player
