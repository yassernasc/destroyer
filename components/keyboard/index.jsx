import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import keycode from 'keycode'
import { escape, filter as filterAction } from './reducer'
import CloseButton from '../close-button'
import { useAdminDisplay } from '../admin/useAdmin'
import { useFilter, useFilterActivated } from './useFilter'
import { toggle } from '../player/reducer'

const isAlphanumeric = keyCode => keyCode >= 48 && keyCode <= 90
const deletePressed = keyCode => keyCode === keycode('del')
const escapePressed = keyCode => keyCode === keycode('esc')
const spacePressed = keyCode => keyCode === keycode('space')

const FilterInput = () => {
  const dispatch = useDispatch()
  const inputEl = useRef(null)
  const [display, setDisplay] = useState(false)
  const adminDisplay = useAdminDisplay()
  const filter = useFilter()
  const filterActivated = useFilterActivated()

  useEffect(() => {
    window.addEventListener('keydown', ({ keyCode }) => {
      if (!adminDisplay) {
        if (isAlphanumeric(keyCode) || deletePressed(keyCode)) {
          inputEl.current.focus()
        }
      }

      if (escapePressed(keyCode)) {
        event.preventDefault()
        dispatch(escape())
      }

      if (spacePressed(keyCode) && !filterActivated) {
        event.preventDefault()
        dispatch(toggle())
      }
    })
  }, [])

  useEffect(() => setDisplay(filterActivated), [filterActivated])

  const handleSearch = (event) => {
    event.preventDefault()
    dispatch(filterAction(event.target.value))
  }

  return (
    <form
      css={[ styles.search, display ? styles.show : styles.hide]}
    >
      <CloseButton />
      <input
        ref={inputEl}
        type="text"
        value={filter}
        css={styles.input}
        onChange={handleSearch}
      />
    </form>
  )
}

export default FilterInput

const styles = {
  search: {
    display: 'block',
    transition: '.25s',
    zIndex: 30,
    width: '100vw',
    position: 'fixed',
    textAlign: 'left'
  },
  input: {
    display: 'block',
    width: '100%',
    appearance: 'none',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    fontFamily: 'AveriaSerif-Light',
    padding: '1em',
    fontSize: '2em',
    marginBottom: '1em',
    transition: 'border .666s',
    color: 'white',
    background: 'rgba(92, 67, 232, .8)'
  },
  span: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '1em',
    fontSize: '2em',
    cursor: 'pointer',
    color: 'white'
  },
  show: {
    opacity: 1,
    transform: 'translateY(0em)'
  },
  hide: {
    opacity: 0,
    transform: 'translateY(-5em)'
  }
}

