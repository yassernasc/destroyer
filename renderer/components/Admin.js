import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { admin as adminAction, close } from '../reducers/admin'
import {
  useAccentColor,
  useAdminDisplay,
  useCloseAdmin,
  useShowAdminOnEmptyLibrary,
} from '../hooks'
import { scan } from '../reducers/library'
import theme from '../utils/theme'

export const Admin = () => {
  const dispatch = useDispatch()
  const display = useAdminDisplay()
  const accent = useAccentColor()

  useCloseAdmin()
  useShowAdminOnEmptyLibrary()

  useEffect(() => {
    window.local.rescan(() => dispatch(scan()))
    window.menu.addFiles(() => dispatch(adminAction()))
    window.addEventListener('dragenter', () => dispatch(adminAction()))
  }, [])

  const handleDrop = event => {
    event.preventDefault()

    const { length, ...filesInfo } = event.dataTransfer.files
    if (length > 0) {
      const paths = Object.values(filesInfo).map(({ path }) => path)
      dispatch(scan(paths))
      dispatch(close())
    }
  }

  return (
    <figure
      css={[styles.drop, display ? styles.show : styles.hide]}
      onDragLeave={() => dispatch(close())}
      onDragOver={event => event.preventDefault()}
      onDrop={handleDrop}
      style={{ backgroundColor: accent.opaque }}
    >
      <span css={styles.span}>Drop music collection here</span>
    </figure>
  )
}

const styles = {
  drop: {
    boxSizing: 'border-box',
    display: 'flex',
    height: '100vh',
    left: '0vw',
    margin: 0,
    padding: 0,
    position: 'fixed',
    top: '0vh',
    transition: '.25s',
    width: '100vw',
    zIndex: 40,
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
    borderBottom: `2px solid ${theme.textColor}`,
    fontSize: '2em',
    margin: 'auto',
    pointerEvents: 'none',
  },
}
