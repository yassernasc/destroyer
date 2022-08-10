import { useDispatch } from 'react-redux'
import { useInView } from 'react-hook-inview'
import { useState } from 'react'

import { showcase } from '../reducers/showcase'

export const Album = ({ album }) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(false)
  const [ref, isVisible] = useInView()

  const getCover = () => {
    return album.cover
      ? { backgroundImage: `url("${album.cover}")` }
      : { backgroundColor: '#333333' }
  }

  return (
    <li
      css={styles.base}
      onClick={() => dispatch(showcase(album.id))}
      onMouseOut={() => setActive(false)}
      onMouseOver={() => setActive(true)}
      ref={ref}
    >
      <div style={!isVisible ? styles.fade : styles.nonfade}>
        <div
          css={[styles.cover, active ? styles.zoom : {}]}
          style={getCover()}
        />
      </div>
      <span style={active ? styles.active : {}}>
        {`${album.artist} - ${album.title}`}
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
