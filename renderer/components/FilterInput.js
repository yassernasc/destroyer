import { useEffect, useRef } from 'react'
import keycode from 'keycode'
import { useDispatch } from 'react-redux'

import { clearFilter, filter as filterAction } from '../reducers/library'
import {
  useAccentColor,
  useAdminDisplay,
  useCloseFilter,
  useFilter,
  useIsFilterActive,
} from '../hooks'
import { CloseButton } from './CloseButton'
import theme from '../utils/theme'

const isAlphanumeric = keyCode => keyCode >= 48 && keyCode <= 90
const deletePressed = keyCode => keyCode === keycode('del')

export const FilterInput = () => {
  const dispatch = useDispatch()
  const inputEl = useRef(null)
  const adminDisplay = useAdminDisplay()
  const filter = useFilter()
  const isFilterActive = useIsFilterActive()
  useCloseFilter()
  const accent = useAccentColor()

  useEffect(() => {
    const handleKeydown = event => {
      const isKeyOfInterest =
        isAlphanumeric(event.keyCode) || deletePressed(event.keyCode)
      if (!adminDisplay && isKeyOfInterest) {
        inputEl.current.focus()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [adminDisplay])

  const handleChange = event => {
    event.preventDefault()
    dispatch(filterAction(event.target.value))
  }

  return (
    <form css={[styles.search, isFilterActive ? styles.show : styles.hide]}>
      <CloseButton onClick={() => dispatch(clearFilter())} />
      <input
        css={styles.input}
        onChange={handleChange}
        ref={inputEl}
        style={{ background: accent.opaque }}
        type="text"
        value={filter}
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
    border: 'none',
    boxShadow: 'none',
    color: theme.textColor,
    display: 'block',
    fontFamily: theme.font,
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
    color: theme.textColor,
    cursor: 'pointer',
    fontSize: '2em',
    padding: '1em',
    position: 'absolute',
    right: 0,
    top: 0,
  },
}
