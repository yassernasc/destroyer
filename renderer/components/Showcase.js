import { keyframes } from '@emotion/react'
import { useDispatch } from 'react-redux'

import { playAlbum, playTrack } from '../reducers/player'
import {
  useCursors,
  useIsShowcasePlaying,
  usePlayingTrackId,
  useShowcaseAlbum,
  useShowcaseToggle,
  useShowcaseTracks,
} from '../hooks'
import { Track } from './Track'
import { close as closeAction } from '../reducers/showcase'

export const Showcase = () => {
  const dispatch = useDispatch()
  const playingTrackId = usePlayingTrackId()
  const album = useShowcaseAlbum()
  const isShowcasePlaying = useIsShowcasePlaying()
  const tracks = useShowcaseTracks()
  const { close, play } = useCursors()
  useShowcaseToggle()

  const display = album !== null

  const handleFigureClick = event => {
    if (event.target.tagName === 'ARTICLE') {
      dispatch(playAlbum(album.id))
    } else {
      dispatch(closeAction())
    }
  }

  const getCover = () => {
    return album?.cover
      ? { backgroundImage: `url("${album.cover}")` }
      : { backgroundColor: '#333333' }
  }

  return (
    <section css={[styles.showcase, display ? styles.show : styles.hide]}>
      <figure
        css={[styles.figure, display ? styles.top : styles.bottom]}
        onClick={handleFigureClick}
        style={{
          cursor: `url('${close}') 32 32, alias`,
        }}
      >
        <article
          css={styles.article}
          style={{
            ...getCover(),
            cursor: `url('${play}') 32 32, alias`,
          }}
        />
      </figure>
      <ol css={[styles.ol, display ? styles.slide : {}]}>
        {tracks.map(track => (
          <Track
            isPlaying={isShowcasePlaying && track.id === playingTrackId}
            key={track.id}
            number={track.trackNumber}
            onClick={() => dispatch(playTrack(track.id))}
            title={track.title}
          />
        ))}
      </ol>
    </section>
  )
}

const rotateKeyframes = keyframes({
  from: {
    transform: 'rotateY(-20deg)',
  },
  to: {
    transform: 'rotateY(20deg)',
  },
})

const styles = {
  article: {
    animation: 'x 5s infinite alternate ease-in-out',
    animationName: rotateKeyframes,
    backfaceVisibility: 'hidden',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '66vh',
    margin: '17vh auto',
    perspective: 500,
    width: '66vh',
  },
  bottom: {
    transform: 'translateY(12.5vh)',
  },
  figure: {
    height: '100vh',
    margin: 0,
    padding: 0,
    perspective: '100vw',
    position: 'absolute',
    top: 0,
    transformStyle: 'preserve-3d',
    transition: 'transform 1s',
    width: '100vw',
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none',
  },
  ol: {
    background: 'rgba(33, 33, 33, .75)',
    bottom: 0,
    height: 'calc(50vh - 100px)',
    listStyle: 'none',
    margin: 0,
    opacity: 0,
    overflow: 'auto',
    padding: '0 0 100px',
    position: 'fixed',
    transform: 'translateY(12.5vh)',
    transitionDelay: '.5s',
    transitionDuration: '1s',
    width: '100vw',
  },
  show: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  showcase: {
    bottom: 0,
    display: 'block',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .666s',
    WebkitUserSelect: 'none',
    zIndex: 5,
  },
  slide: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  top: {
    transform: 'translateY(0)',
  },
}
