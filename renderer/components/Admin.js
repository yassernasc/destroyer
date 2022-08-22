import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { admin as adminAction, close } from '../reducers/admin'
import {
  useAdminDisplay,
  useCloseAdmin,
  useShowAdminOnEmptyLibrary,
} from '../hooks'
import { search } from '../reducers/library'

export const Admin = () => {
  const dispatch = useDispatch()
  const display = useAdminDisplay()
  useCloseAdmin()
  useShowAdminOnEmptyLibrary()

  useEffect(() => {
    window.menu.addFiles(() => dispatch(adminAction()))
    window.addEventListener('dragenter', () => dispatch(adminAction()))
  }, [])

  const handleDrop = event => {
    event.preventDefault()

    const { length, ...filesInfo } = event.dataTransfer.files
    if (length > 0) {
      const paths = Object.values(filesInfo).map(({ path }) => path)
      dispatch(search(paths))
      dispatch(close())
    }
  }

  return (
    <figure
      css={[styles.drop, display ? styles.show : styles.hide]}
      onDragLeave={() => dispatch(close())}
      onDragOver={event => event.preventDefault()}
      onDrop={handleDrop}
    >
      <span css={styles.span}>Drop music collection here</span>
    </figure>
  )
}

const styles = {
  drop: {
    backgroundColor: 'rgba(92, 67, 232, .8)',
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
    borderBottom: '2px solid white',
    fontSize: '2em',
    margin: 'auto',
    pointerEvents: 'none',
  },
}
