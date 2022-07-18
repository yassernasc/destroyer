import { useState, useEffect } from 'react'
import { keyframes } from '@emotion/react'
import { store } from '../../client.js'
import Track from './track.jsx'
import close from './close.png'
import play from './play.png'

const Showcase = props => {
  const [display, setDisplay] = useState(false)
  const [album, setAlbum] = useState({ id: '', cover: '', tracks: [] })
  const [isPlayingAlbum, setIsPlayingAlbum] = useState(false)

  useEffect(() => {
    const newAlbumId = props.showcase.albumId
    if (newAlbumId === null) {
      setDisplay(false)
      setAlbum({ cover: '', tracks: [] })
    } else {
      const album = store.getState().library.albums.find(({ id }) => newAlbumId === id)
      setAlbum(album)
      setDisplay(true)
    }
  }, [props.showcase.albumId])

  useEffect(() => {
    if (props.showcase.albumId && props.player.albumId) {
      setIsPlayingAlbum(props.showcase.albumId === props.player.albumId)
    } else {
      setIsPlayingAlbum(false)
    }
  }, [props.showcase.albumId, props.player.albumId])

  const handleFigureClick = event => {
    if (event.target.tagName === 'ARTICLE') {
      store.dispatch({ type: 'PLAY_ALBUM', albumId: props.showcase.albumId })
    } else {
      store.dispatch({ type: 'CLOSE_SHOWCASE' })
    }
  }

  const handleTrackClick = trackNumber => {
    store.dispatch({
      type: 'PLAY_TRACK',
      albumId: props.showcase.albumId,
      trackNumber
    })
  }

  const getCover = () => {
    return album.cover
      ? { backgroundImage: 'url("' + album.cover + '")' }
      : { backgroundColor: `#333333` }
  }

  return (
    <section css={[styles.showcase, display ? styles.show : styles.hide]}>
      <figure
        css={[
          styles.figure,
          display ? styles.top : styles.bottom
        ]}
        onClick={handleFigureClick}
      >
        <article css={[styles.article, getCover()]} />
      </figure>
      <ol
        css={[styles.ol, display ? styles.slide : '']}
      >
        {album.tracks.map((track, index) => (
          <Track 
            key={index}
            title={track.title}
            number={track.trackNumber}
            current={isPlayingAlbum && track.trackNumber === props.player.trackNumber}
            onClick={handleTrackClick} 
          />
        ))}
      </ol>
    </section>
  )
}

export default Showcase

const rotateKeyframes = keyframes({
  from: {
    transform: 'rotateY(-20deg)'
  },
  to: {
    transform: 'rotateY(20deg)'
  }
})

const styles = {
  showcase: {
    display: 'block',
    position: 'fixed',
    WebkitUserSelect: 'none',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .666s',
    background: 'rgba(33, 33, 33, .8)'
  },
  figure: {
    width: '100vw',
    transition: 'transform 1s',
    cursor: 'url(' + close + ') 32 32, alias',
    perspective: '100vw',
    position: 'absolute',
    margin: 0,
    padding: 0,
    top: 0,
    transformStyle: 'preserve-3d',
    height: '100vh'
  },
  bottom: {
    transform: 'translateY(12.5vh)'
  },
  top: {
    transform: 'translateY(0)'
  },
  article: {
    margin: '17vh auto',
    width: '66vh',
    backfaceVisibility: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '66vh',
    cursor: 'url(' + play + ') 32 32, pointer',
    perspective: 500,
    animation: 'x 5s infinite alternate ease-in-out',
    animationName: rotateKeyframes
  },
  ol: {
    position: 'fixed',
    bottom: 0,
    overflow: 'auto',
    listStyle: 'none',
    width: '100vw',
    height: 'calc(50vh - 100px)',
    margin: 0,
    padding: '0 0 100px',
    transitionDuration: '1s',
    transitionDelay: '.5s',
    background: 'rgba(33, 33, 33, .75)',
    opacity: 0,
    transform: 'translateY(12.5vh)'
  },
  slide: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  show: {
    opacity: 1,
    pointerEvents: 'auto'
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}
