import { useEffect, useRef } from 'react'
import keycode from 'keycode'
import { useDispatch } from 'react-redux'

import { escape, filter as filterAction } from '../reducers/keyboard'
import { useAdminDisplay, useFilter, useIsFilterActive } from '../hooks'
import { CloseButton } from './Close-Button'
import { toggle } from '../reducers/player'

const isAlphanumeric = keyCode => keyCode >= 48 && keyCode <= 90
const deletePressed = keyCode => keyCode === keycode('del')
const escapePressed = keyCode => keyCode === keycode('esc')
const spacePressed = keyCode => keyCode === keycode('space')

export const FilterInput = () => {
  const dispatch = useDispatch()
  const inputEl = useRef(null)
  const adminDisplay = useAdminDisplay()
  const filter = useFilter()
  const isFilterActive = useIsFilterActive()

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
        // dispatch(adminEscape())
      }

      if (spacePressed(keyCode) && !isFilterActive) {
        event.preventDefault()
        dispatch(toggle())
      }
    })
  }, [])

  const handleSearch = event => {
    event.preventDefault()
    dispatch(filterAction(event.target.value))
  }

  return (
    <form css={[styles.search, isFilterActive ? styles.show : styles.hide]}>
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

const styles = {
  hide: {
    opacity: 0,
    transform: 'translateY(-5em)',
  },
  input: {
    appearance: 'none',
    background: 'rgba(92, 67, 232, .8)',
    border: 'none',
    boxShadow: 'none',
    color: 'white',
    display: 'block',
    fontFamily: 'AveriaSerif-Light',
    fontSize: '2em',
    marginBottom: '1em',
    outline: 'none',
    padding: '1em',
    transition: 'border .666s',
    width: '100%',
  },
  search: {
    display: 'block',
    position: 'fixed',
    textAlign: 'left',
    transition: '.25s',
    width: '100vw',
    zIndex: 30,
  },
  show: {
    opacity: 1,
    transform: 'translateY(0em)',
  },
  span: {
    color: 'white',
    cursor: 'pointer',
    fontSize: '2em',
    padding: '1em',
    position: 'absolute',
    right: 0,
    top: 0,
  },
}
