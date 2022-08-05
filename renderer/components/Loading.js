import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { scanning } from '../reducers/loading'
import { useLoadingMessage } from '../hooks'

export const Loading = () => {
  const [display, setDisplay] = useState(false)
  const dispatch = useDispatch()
  const loadingMessage = useLoadingMessage()

  useEffect(() => {
    window.local.onAlbumFound((event, scanningInfo) =>
      dispatch(scanning(scanningInfo))
    )
  }, [])
  useEffect(() => setDisplay(loadingMessage !== ''), [loadingMessage])

  return (
    <section css={[styles.base, display ? styles.show : styles.hide]}>
      <span css={styles.span}>{loadingMessage}</span>
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
