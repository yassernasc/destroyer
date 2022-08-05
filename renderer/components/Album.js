import { useEffect, useRef, useState } from 'react'
import inView from 'in-view'
import { useDispatch } from 'react-redux'

import { showcase } from '../reducers/showcase'

const rafThrottle = callback => {
  let requestId
  const later = args => () => {
    requestId = null
    callback(...args)
  }
  const throttled = (...args) => {
    if (requestId == null) {
      requestId = window.requestAnimationFrame(later(args))
    }
  }
  throttled.cancel = () => window.cancelAnimationFrame(requestId)
  return throttled
}

export const Album = props => {
  const dispatch = useDispatch()
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
      ? { backgroundImage: `url('${props.album.cover}')` }
      : { backgroundColor: '#333333' }
  }

  const handleClick = () => dispatch(showcase(props.album.id))

  return (
    <li
      onClick={handleClick}
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
      css={styles.base}
    >
      <div css={fade ? styles.fade : styles.nonfade}>
        <div
          ref={albumEl}
          css={[styles.cover, getCover(), active ? styles.zoom : '']}
        />
      </div>
      <span css={[active ? styles.active : '']}>
        {`${props.album.artist} - ${props.album.title}`}
      </span>
    </li>
  )
}

const styles = {
  active: {
    borderBottom: '2px solid rgba(92, 67, 232, .8)',
  },
  base: {
    cursor: 'pointer',
    flex: '1 1 250px',
    lineHeight: '1.5em',
    padding: '1em 2em',
  },
  cover: {
    backgroundColor: '#2b2b2b',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    border: '2px solid #181818',
    height: 0,
    marginBottom: '.5em',
    paddingTop: '100%',
    transform: 'scale(0.98)',
    transition: 'transform .25s, opacity .25s',
  },
  fade: {
    opacity: 0,
    transform: 'scale(.9)',
    willChange: 'transform',
  },
  nonfade: {
    transitionDelay: '.25s',
    transitionDuration: '.5s',
    willChange: 'transform',
  },
  zoom: {
    border: '2px solid rgba(92, 67, 232, .8)',
    transform: 'scale(1)',
  },
}
