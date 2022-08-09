import { useEffect, useRef } from 'react'
import keycode from 'keycode'
import { useDispatch } from 'react-redux'

import { nextTrack, playerStatus, tick, toggle } from '../reducers/player'
import { useIsFilterActive, usePlayerStatus, usePlayingTrack } from '../hooks'
import { Playbar } from './Playbar'

export const Player = () => {
  const dispatch = useDispatch()
  const audioEl = useRef(null)
  const track = usePlayingTrack()
  const status = usePlayerStatus()
  const isFilterActive = useIsFilterActive()

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

  useEffect(() => {
    const handleKeydown = event => {
      if (
        status !== playerStatus.stopped &&
        !isFilterActive &&
        event.keyCode === keycode('space')
      ) {
        event.preventDefault()
        dispatch(toggle())
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [status, isFilterActive])

  const play = () => audioEl.current.play()
  const pause = () => audioEl.current.pause()
  const updateCurrentTime = time => {
    const newTime = Math.floor(time)
    audioEl.current.currentTime = newTime
    dispatch(tick(newTime))
  }

  return (
    <>
      <audio id="xxx" ref={audioEl} />
      <Playbar updateTime={updateCurrentTime} />
    </>
  )
}
