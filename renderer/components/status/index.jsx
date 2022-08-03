import { useEffect, useState } from 'react'
import { useCurrentTrack, useCurrentAlbum } from '../library/useLibrary.js'
import { playerStatus } from '../player/reducer'
import { usePlayerStatus, usePlayerTime } from '../player/usePlayer.js'

const Status = () => {
  const [display, setDisplay] = useState(false)
  const status = usePlayerStatus()
  const time = usePlayerTime()
  const currentTrack = useCurrentTrack()
  const currentAlbum = useCurrentAlbum()

  const getTime = () => {
    if (time === 0) {
      return '- 00:00:00'
    }

    const remainingTime = currentTrack.duration - time

    const hours = Math.floor(remainingTime / 60 / 60).toString().padStart(2, '0')
    const minutes = Math.floor((remainingTime / 60) % 60).toString().padStart(2, '0')
    const seconds = Math.round(Math.floor(remainingTime % 60)).toString().padStart(2, '0')
    return `- ${hours}:${minutes}:${seconds}`
  }
  
  useEffect(() => {
    status === playerStatus.stopped ? setDisplay(false) : setDisplay(true)
  }, [status])

  return (
    <figure css={[styles.status, display ? styles.show : styles.hide]}>
      <div>
        <h1 css={styles.h1}>{currentAlbum?.artist ?? ''}</h1>
        <h2 css={styles.h2}>{currentTrack?.title ?? ''}</h2>
        <h3 css={styles.h3}>{currentAlbum?.title ?? ''}</h3>
        <h4 css={styles.h4}>{getTime()}</h4>
      </div>
    </figure>
  )
}

export default Status

const styles = {
  status: {
    display: 'flex',
    width: '100vw',
    height: 'auto',
    WebkitUserSelect: 'none',
    padding: '1em 0',
    margin: 0,
    position: 'fixed',
    transition: '.5s',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backgroundImage:
      'linear-gradient( to bottom, rgba(33, 33, 33, .9), rgba(33, 33, 33, 0))',
    top: 0,
    left: 0,
    textAlign: 'center',
    overflow: 'hidden',
    zIndex: 10,
    flexWrap: 'wrap'
  },
  h1: {
    fontSize: '3em',
    margin: '0 0 0px',
    lineHeight: '1em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  h2: {
    fontSize: '2.5em',
    margin: 0,
    lineHeight: '1em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  h3: {
    fontSize: '2em',
    margin: '0 0 -0.125em',
    lineHeight: '1.25em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  h4: {
    fontSize: '2em',
    margin: '0 0 -0.125em',
    lineHeight: '1.25em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  show: {
    opacity: 1,
    transform: 'translateY(0em)'
  },
  hide: {
    opacity: 0,
    transform: 'translateY(-3em)'
  }
}
