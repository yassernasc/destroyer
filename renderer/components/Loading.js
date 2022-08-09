import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { scanning } from '../reducers/library'
import { useMessage } from '../hooks'

export const Loading = () => {
  const dispatch = useDispatch()
  const message = useMessage()

  const display = message !== ''

  useEffect(() => {
    window.local.onAlbumFound((event, scanningInfo) =>
      dispatch(scanning(scanningInfo))
    )
  }, [])

  return (
    <section css={[styles.base, display ? styles.show : styles.hide]}>
      <span css={styles.span}>{message}</span>
    </section>
  )
}

const styles = {
  base: {
    alignItems: 'center',
    backgroundColor: 'rgba(92, 67, 232, .8)',
    display: 'flex',
    fontSize: '120%',
    height: '100vh',
    justifyContent: 'center',
    pointerEvents: 'none',
    position: 'fixed',
    transition: '.5s',
    width: '100vw',
    zIndex: 60,
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none',
  },
  show: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  span: {
    margin: 'auto',
  },
}
