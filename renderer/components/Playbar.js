import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  nextTrack,
  playerStatus,
  previousTrack,
  toggle as toggleAction,
} from '../reducers/player'
import { usePlayerStatus, usePlayerTime, usePlayingTrack } from '../hooks'

export const Playbar = ({ updateTime }) => {
  const dispatch = useDispatch()
  const elapsedBar = useRef(null)
  const [hover, setHover] = useState(false)
  const [left, setLeft] = useState(false)
  const [display, setDisplay] = useState(false)
  const status = usePlayerStatus()
  const track = usePlayingTrack()
  const time = usePlayerTime()

  useEffect(() => setDisplay(status !== playerStatus.stopped), [status])

  const scan = event => {
    event.preventDefault()
    const percentage = event.clientX / window.innerWidth
    const newTime = track.duration * percentage

    updateTime(newTime)
  }

  const previous = () => dispatch(previousTrack())
  const next = () => dispatch(nextTrack())
  const toggle = () => dispatch(toggleAction())

  const handleMove = event => {
    event.preventDefault()
    setLeft(event.clientX - 4)
  }

  useEffect(() => {
    if (track && time > 0) {
      const percentage = (time / track.duration) * 100
      elapsedBar.current.style.width = `${percentage}%`
    } else {
      elapsedBar.current.style.width = '0%'
    }
  }, [track, time])

  return (
    <div css={[styles.playbar, display ? styles.show : styles.hide]}>
      <div
        css={{
          cursor: 'none',
          height: 40,
          position: 'relative',
          width: '100%',
        }}
        onMouseMove={handleMove}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={scan}
      >
        <div ref={elapsedBar} css={styles.range} />
        <div css={styles.buffer} />
        <div
          css={[
            styles.slider,
            hover ? { opacity: 1 } : { opacity: 0 },
            { transform: `translateX(${left}px)` || 0 },
          ]}
        />
      </div>
      <div css={styles.panel}>
        <span css={styles.span} key="previous" onClick={previous}>
          previous
        </span>
        <span css={styles.span} key="toggle" onClick={toggle}>
          {status === playerStatus.playing ? 'pause' : 'play'}
        </span>
        <span css={styles.span} key="next" onClick={next}>
          next
        </span>
      </div>
    </div>
  )
}

const styles = {
  buffer: {
    background: 'rgba(92, 67, 232, 0.666)',
    height: 40,
    position: 'absolute',
    top: 0,
    width: '100vw',
    zIndex: 20,
  },
  hide: {
    transform: 'translateY(3em)',
  },
  panel: {
    background: 'rgba(33,33,33,.666)',
    borderTop: '2px solid #212121',
    fontSize: '1.5em',
    fontStyle: 'italic',
    fontWeight: 200,
    height: 45,
    lineHeight: '40px',
    position: 'absolute',
    textAlign: 'center',
    top: 40,
    width: '100%',
  },
  playbar: {
    bottom: 0,
    height: 85,
    opacity: 0,
    pointerEvents: 'none',
    position: 'fixed',
    transition: '.666s',
    WebkitUserSelect: 'none',
    width: '100%',
    zIndex: 10,
  },
  range: {
    background: 'rgba(92, 67, 232, 1)',
    height: 40,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    transition: 'width .25s linear',
    width: 0,
  },
  show: {
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'translateY(0em)',
  },
  slider: {
    background: 'white',
    height: 40,
    position: 'absolute',
    top: 0,
    transition: 'opacity .666s',
    width: 4,
    zIndex: 69,
  },
  span: {
    ':hover': {
      background: 'rgba(92, 67, 232, .8)',
    },
    cursor: 'pointer',
    display: 'inline-block',
    padding: '0 0em 1em',
    transition: '.5s',
    width: '200px',
  },
}
