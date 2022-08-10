import { useFilteredLibrary, usePlayerStatus } from '../hooks'
import { Album } from './Album'
import { playerStatus } from '../reducers/player'

export const Library = () => {
  const library = useFilteredLibrary()
  const status = usePlayerStatus()

  return (
    <ul
      css={[
        styles.base,
        status !== playerStatus.stopped
          ? styles.largerPadding
          : styles.normalPadding,
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
  largerPadding: { padding: '12.5vh 0 33vh' },
  li: {
    flex: '1 1 250px',
    order: 10,
    padding: '1em 2em',
  },
  normalPadding: { padding: '2em 0 33vh' },
}
