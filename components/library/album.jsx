import { useState, useEffect, useRef } from 'react'
import { store } from '../../client.js'
import { rafThrottle } from '../utilities'
import inView from 'in-view'

const Album = props => {
  const albumEl = useRef(null)
  const [active, setActive] = useState(false)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const coverEvent = rafThrottle(coverHandler)
    props.container.addEventListener('scroll', coverEvent)
    coverHandler()
    return () => props.container.removeEventListener('scroll', coverEvent)
  }, [])

  const coverHandler = () => {
    inView.is(albumEl.current) ? setFade(false) : setFade(true)
  }

  const getCover = () => {
    return props.album.cover
      ? { backgroundImage: 'url("' + props.album.cover + '")' }
      : { backgroundColor: `#333333` }
  }

  const handleClick = () => {
    store.dispatch({ type: 'SHOWCASE', albumId: props.album.id })
  }

  return (
    <li
      onClick={handleClick}
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
      css={[
        styles.base,
        props.newest ? { order: props.album.time } : { order: -2 }
      ]}
    >
      <div css={fade ? styles.fade : styles.nonfade}>
        <div
          ref={albumEl}
          css={[styles.cover, getCover(), active ? styles.zoom : '']}
        />
      </div>
      <span css={[active ? styles.active : '']}>
        {props.album.artist + ' - ' + props.album.title}
      </span>
    </li>
  )
}

export default Album

const styles = {
  base: {
    flex: '1 1 250px',
    padding: '1em 2em',
    lineHeight: '1.5em',
    cursor: 'pointer'
  },
  cover: {
    height: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundColor: '#2b2b2b',
    paddingTop: '100%',
    transition: 'transform .25s, opacity .25s',
    border: '2px solid #181818',
    marginBottom: '.5em',
    transform: 'scale(0.98)'
  },
  active: {
    borderBottom: '2px solid rgba(92, 67, 232, .8)'
  },
  zoom: {
    transform: 'scale(1)',
    border: '2px solid rgba(92, 67, 232, .8)'
  },
  nonfade: {
    transitionDuration: '.5s',
    transitionDelay: '.25s',
    willChange: 'transform'
  },
  fade: {
    opacity: 0,
    transform: 'scale(.9)',
    willChange: 'transform'
  }
}
