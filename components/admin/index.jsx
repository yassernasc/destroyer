import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { searchLocalMusic } from '../connection/local.js'
import { useAdminDisplay } from './useAdmin.js'
import { admin as adminAction, drop } from './reducer.js'

const Admin = () => {
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
    window.addEventListener('dragleave', () => dispatch(drop()))
  }, [])

  const handleDrop = event => {
    event.preventDefault()
    setDragging(false)
    
    const { length, ...filesInfo } = event.dataTransfer.files
    if (length > 0) {
      const paths = Object.values(filesInfo).map(({ path }) => path)
      searchLocalMusic(paths)
      dispatch(drop())
    }
  }

  return (
    <figure
      css={[
        styles.drop,
        display || dragging ? styles.show : styles.hide
      ]}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <span css={styles.span}>Drop music collection here</span>
    </figure>
  )
}

export default Admin

const styles = {
  drop: {
    display: 'flex',
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(92, 67, 232, .8)',
    top: '0vh',
    left: '0vw',
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    zIndex: 40,
    transition: '.25s'
  },
  span: {
    margin: 'auto',
    fontSize: '2em',
    borderBottom: '2px solid white',
    pointerEvents: 'none'
  },
  show: {
    pointerEvents: 'auto',
    opacity: 1
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}
