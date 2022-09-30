import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useTheme } from '@emotion/react'

import { clear, scanUpdate } from '../reducers/notification'
import { useIsScanningLibrary, useNotificationMessage } from '../hooks'

export const Notification = () => {
  const dispatch = useDispatch()
  const message = useNotificationMessage()
  const isScanning = useIsScanningLibrary()
  const theme = useTheme()
  const styles = getStyles(theme)
  const display = message !== ''

  useEffect(() => {
    window.local.onScanUpdate((event, metadata) =>
      dispatch(scanUpdate(metadata))
    )
  }, [])

  // Close Notification after scanning is complete
  useEffect(() => {
    if (display && !isScanning && message.includes('SCANNING:')) {
      dispatch(clear())
    }
  }, [isScanning])

  return (
    <section css={[styles.base, display ? styles.show : styles.hide]}>
      <span css={styles.span}>{message}</span>
    </section>
  )
}

const getStyles = ({ colors }) => ({
  base: {
    alignItems: 'center',
    backgroundColor: colors.main.opaque,
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
})
