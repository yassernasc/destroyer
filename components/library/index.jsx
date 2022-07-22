import { useEffect, useRef } from 'react'
import Album from './album.jsx'
import { usePlayerStatus } from '../player/usePlayer.js'
import { playerStatus } from '../player/reducer.js'
import { useFilteredLibrary } from './useLibrary.js'

const Library = () => {
  const libraryEl = useRef(null)
  const library = useFilteredLibrary()
  const status = usePlayerStatus()

  return (
    <ul
      ref={libraryEl}
      css={[
        styles.base,
        status !== playerStatus.stopped
          ? { padding: '12.5vh 0 33vh' }
          : { padding: '2em 0 33vh' }
      ]}
    >
      {library.map((album, index) => (
        <Album
          album={album}
          key={index}
          container={libraryEl.current}
          newest={library.newest}
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
