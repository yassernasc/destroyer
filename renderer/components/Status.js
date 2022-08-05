import { useEffect, useState } from 'react'

import {
  usePlayerStatus,
  usePlayerTime,
  usePlayingAlbum,
  usePlayingTrack,
} from '../hooks'
import { playerStatus } from '../reducers/player'

export const Status = () => {
  const [display, setDisplay] = useState(false)
  const status = usePlayerStatus()
  const time = usePlayerTime()
  const track = usePlayingTrack()
  const album = usePlayingAlbum()

  const getTime = () => {
    if (time === 0) {
      return '- 00:00:00'
    }

    const remainingTime = track.duration - time

    const hours = Math.floor(remainingTime / 60 / 60)
      .toString()
      .padStart(2, '0')
    const minutes = Math.floor((remainingTime / 60) % 60)
      .toString()
      .padStart(2, '0')
    const seconds = Math.round(Math.floor(remainingTime % 60))
      .toString()
      .padStart(2, '0')
    return `- ${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    status === playerStatus.stopped ? setDisplay(false) : setDisplay(true)
  }, [status])

  return (
    <figure css={[styles.status, display ? styles.show : styles.hide]}>
      <div>
        <h1 css={styles.h1}>{album?.artist ?? ''}</h1>
        <h2 css={styles.h2}>{track?.title ?? ''}</h2>
        <h3 css={styles.h3}>{album?.title ?? ''}</h3>
        <h4 css={styles.h4}>{getTime()}</h4>
      </div>
    </figure>
  )
}

const styles = {
  h1: {
    flex: '1 1 100vw',
    fontSize: '3em',
    fontWeight: 200,
    lineHeight: '1em',
    margin: '0 0 0px',
    padding: 0,
  },
  h2: {
    flex: '1 1 100vw',
    fontSize: '2.5em',
    fontWeight: 200,
    lineHeight: '1em',
    margin: 0,
    padding: 0,
  },
  h3: {
    flex: '1 1 100vw',
    fontSize: '2em',
    fontWeight: 200,
    lineHeight: '1.25em',
    margin: '0 0 -0.125em',
    padding: 0,
  },
  h4: {
    flex: '1 1 100vw',
    fontSize: '2em',
    fontWeight: 200,
    lineHeight: '1.25em',
    margin: '0 0 -0.125em',
    padding: 0,
  },
  hide: {
    opacity: 0,
    transform: 'translateY(-3em)',
  },
  show: {
    opacity: 1,
    transform: 'translateY(0em)',
  },
  status: {
    alignItems: 'center',
    backgroundImage:
      'linear-gradient( to bottom, rgba(33, 33, 33, .9), rgba(33, 33, 33, 0))',
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto',
    justifyContent: 'center',
    left: 0,
    margin: 0,
    overflow: 'hidden',
    padding: '1em 0',
    pointerEvents: 'none',
    position: 'fixed',
    textAlign: 'center',
    top: 0,
    transition: '.5s',
    WebkitUserSelect: 'none',
    width: '100vw',
    zIndex: 10,
  },
}
