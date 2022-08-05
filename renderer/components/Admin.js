import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { admin as adminAction, drop } from '../reducers/admin'
import { connect } from '../reducers/library'
import { useAdminDisplay } from '../hooks'

export const Admin = () => {
  const dispatch = useDispatch()
  const [dragging, setDragging] = useState(false)
  const display = useAdminDisplay()

  useEffect(() => {
    if (localStorage.getItem('fileList')) {
      const fileList = JSON.parse(localStorage.getItem('fileList'))
      searchLocalMusic(fileList)
    } else {
      dispatch(adminAction())
    }

    window.addEventListener('dragenter', () => dispatch(adminAction()))
    window.menu.addFiles(() => dispatch(adminAction()))
    window.addEventListener('dragleave', () => dispatch(drop()))
  }, [])

  const handleDrop = event => {
    event.preventDefault()
    setDragging(false)

    const { length, ...filesInfo } = event.dataTransfer.files
    if (length > 0) {
      const paths = Object.values(filesInfo).map(({ path }) => path)
      localStorage.setItem('fileList', JSON.stringify(paths))
      searchLocalMusic(paths)
      dispatch(drop())
    }
  }

  const searchLocalMusic = async pathList => {
    const newLibrary = await window.local.search(pathList)
    dispatch(connect(newLibrary))
  }

  return (
    <figure
      css={[styles.drop, display || dragging ? styles.show : styles.hide]}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
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
