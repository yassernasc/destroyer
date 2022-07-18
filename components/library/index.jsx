import { useEffect, useRef } from 'react'
import Album from './album.jsx'
import { store } from '../../client.js'

const Library = props => {
  const libraryEl = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('newest') === 'true') {
      store.dispatch({ type: 'NEW' })
    } else {
      store.dispatch({ type: 'ALPHA' })
    }
  }, [])

  const getAlbumList = () => {
    const filterAlbums = () => {
      return props.library.albums.filter(album => {
        const filter = props.filter.title
        const includesTest = (a, b) => a.toLowerCase().includes(b.toLowerCase())
        return includesTest(album.title, filter) || includesTest(album.artist, filter)
      })
    }

    return props.filter.title === '' ? props.library.albums : filterAlbums()
  }

  return (
    <ul
      ref={libraryEl}
      css={[
        styles.base,
        props.player.track
          ? { padding: '12.5vh 0 33vh' }
          : { padding: '2em 0 33vh' }
      ]}
    >
      {getAlbumList().map((album, index) => (
        <Album
          album={album}
          key={index}
          container={libraryEl.current}
          newest={props.library.newest}
        />
      ))}
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
      <li css={styles.li} />
    </ul>
  )
}

export default Library

const styles = {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    height: '100vh',
    margin: 0,
    WebkitUserSelect: 'none',
    listStyle: 'none',
    overflow: 'scroll',
    transition: 'padding .5s',
    transform: 'translate3d(0, 0, 0)'
  },
  li: {
    flex: '1 1 250px',
    padding: '1em 2em',
    order: 10
  }
}
