import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useCurrentTrack } from '../library/useLibrary'
import {
  playerStatus,
  previousTrack,
  nextTrack,
  toggle as toggleAction,
} from '../player/reducer'
import { usePlayerTime, usePlayerStatus } from '../player/usePlayer'

const Playbar = ({ updateTime }) => {
  const dispatch = useDispatch()
  const elapsedBar = useRef(null)
  const [hover, setHover] = useState(false)
  const [left, setLeft] = useState(false)
  const [display, setDisplay] = useState(false)
  const status = usePlayerStatus()
  const currentTrack = useCurrentTrack()
  const time = usePlayerTime()

  useEffect(() => setDisplay(status !== playerStatus.stopped), [status])

  const scan = event => {
    event.preventDefault()
    const percentage = event.clientX / window.innerWidth
    const newTime = currentTrack.duration * percentage

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
    if (currentTrack && time > 0) {
      elapsedBar.current.style.width = `${
        (time / currentTrack.duration) * 100
      }%`
    } else {
      elapsedBar.current.style.width = '0%'
    }
  }, [currentTrack, time])

  return (
    <div css={[styles.playbar, display ? styles.show : styles.hide]}>
      <div
        css={{
          position: 'relative',
          height: 40,
          width: '100%',
          cursor: 'none',
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

export default Playbar

const styles = {
  playbar: {
    position: 'fixed',
    pointerEvents: 'none',
    opacity: 0,
    bottom: 0,
    height: 85,
    zIndex: 10,
    WebkitUserSelect: 'none',
    width: '100%',
    transition: '.666s',
  },
  slider: {
    position: 'absolute',
    width: 4,
    transition: 'opacity .666s',
    height: 40,
    background: 'white',
    top: 0,
    zIndex: 69,
  },
  panel: {
    height: 45,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    top: 40,
    borderTop: '2px solid #212121',
    background: 'rgba(33,33,33,.666)',
    lineHeight: '40px',
    fontSize: '1.5em',
    fontWeight: 200,
    fontStyle: 'italic',
  },
  span: {
    display: 'inline-block',
    padding: '0 0em 1em',
    width: '200px',
    cursor: 'pointer',
    transition: '.5s',
    ':hover': {
      background: 'rgba(92, 67, 232, .8)',
    },
  },
  range: {
    height: 40,
    top: 0,
    left: 0,
    pointerEvents: 'none',
    background: 'rgba(92, 67, 232, 1)',
    transition: 'width .25s linear',
    width: 0,
    position: 'absolute',
  },
  buffer: {
    height: 40,
    width: '100vw',
    top: 0,
    position: 'absolute',
    background: 'rgba(92, 67, 232, 0.666)',
    zIndex: 20,
  },
  show: {
    transform: 'translateY(0em)',
    opacity: 1,
    pointerEvents: 'auto',
  },
  hide: {
    transform: 'translateY(3em)',
  },
}
