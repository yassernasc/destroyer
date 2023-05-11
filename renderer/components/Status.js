import {
  usePlayerStatus,
  usePlayingAlbum,
  usePlayingTrack,
  useRemainingTime,
} from '../hooks'
import { playerStatus } from '../reducers/player'

export const Status = () => {
  const status = usePlayerStatus()
  const track = usePlayingTrack()
  const album = usePlayingAlbum()
  const remainingTime = useRemainingTime()

  const display = status !== playerStatus.stopped

  return (
    <figure css={[styles.status, display ? styles.show : styles.hide]}>
      <div>
        <h1 css={[styles.h1, styles.shadow]}>{album?.artist ?? ''}</h1>
        <h2 css={[styles.h2, styles.shadow]}>{track?.title ?? ''}</h2>
        <h3 css={[styles.h3, styles.shadow]}>{album?.title ?? ''}</h3>
        <h4 css={[styles.h4, styles.shadow]}>{remainingTime}</h4>
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
  shadow: {
    textShadow: '#000 1px 2px 4px',
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
