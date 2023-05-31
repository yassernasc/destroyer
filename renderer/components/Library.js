import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { useLibrary, usePlayerStatus, useShowcaseAlbum } from '../hooks'
import { Album } from './Album'
import { playerStatus } from '../reducers/player'
import { sortingCriteria } from '../reducers/library'

export const Library = () => {
  const library = useLibrary()
  const status = usePlayerStatus()
  const dispatch = useDispatch()

  const showcaseAlbum = useShowcaseAlbum()
  const showcaseOpen = showcaseAlbum !== null

  useEffect(() => {
    window.menu.onSortingUpdate((event, criteria) =>
      dispatch(sortingCriteria(criteria))
    )
  }, [])

  return (
    <ul
      css={[
        styles.base,
        status !== playerStatus.stopped
          ? styles.largerPadding
          : styles.normalPadding,
        showcaseOpen ? styles.opacity : {},
      ]}
    >
      {library.map(album => (
        <Album album={album} key={album.id} />
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

const styles = {
  base: {
    bottom: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    listStyle: 'none',
    margin: 0,
    overflow: 'scroll',
    position: 'fixed',
    transform: 'translate3d(0, 0, 0)',
    transition: 'padding .5s',
    WebkitUserSelect: 'none',
    width: '100vw',
  },
  largerPadding: {
    padding: '12.5vh 0 33vh',
  },
  li: {
    flex: '1 1 250px',
    order: 10,
    padding: '1em 2em',
  },
  normalPadding: {
    padding: '2em 0 33vh',
  },
  opacity: {
    opacity: 0.15,
  },
}
