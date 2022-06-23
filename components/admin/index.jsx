import { useState, useEffect, useRef } from 'react'
import { store } from '../../client.js'
import Local from '../connection/local.js'

const Admin = props => {
  const local = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [mouse, setMouse] = useState(true)

  useEffect(() => {
    local.current = new Local()

    if (localStorage.getItem('fileList')) {
      local.current.collection(JSON.parse(localStorage.getItem('fileList')))
    } else {
      store.dispatch({ type: 'ADMIN' })
    }

    window.addEventListener('dragenter', () => store.dispatch({ type: 'ADMIN' }))
    window.addEventListener('dragleave', () => store.dispatch({ type: 'DROP' }))
  }, [])

  const handleDrop = event => {
    event.preventDefault()
    setDragging(false)
    if (event.dataTransfer.files.length > 0) {
      local.collection(event.dataTransfer.files)
      store.dispatch({ type: 'DROP' })
    }
  }

  return (
    <figure
      css={[
        styles.drop,
        props.admin.display || dragging
          ? styles.show
          : styles.hide
      ]}
      onMouseOver={() => setMouse(true)}
      onMouseOut={() => setMouse(false)}
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
