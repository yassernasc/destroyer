import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { scanning } from '../reducers/loading'
import { useLoadingMessage } from '../hooks/useLoadingMessage'

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
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(92, 67, 232, .8)',
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 60,
    transition: '.5s',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '120%',
  },
  span: {
    margin: 'auto',
  },
  show: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none',
  },
}
