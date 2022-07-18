import { useEffect, useRef, useState } from 'react'
import keycode from 'keycode'
import CloseButton from '../close-button'
import { store } from '../../client.js'

const isAlphanumeric = keyCode => keyCode >= 48 && keyCode <= 90
const deletePressed = keyCode => keyCode === keycode('del')
const escapePressed = keyCode => keyCode === keycode('esc')
const spacePressed = keyCode => keyCode === keycode('space')

const FilterInput = props => {
  const inputEl = useRef(null)
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', ({ keyCode }) => {
      if (!props.admin.display) {
        if (isAlphanumeric(keyCode) || deletePressed(keyCode)) {
          inputEl.current.focus()
        }
      }

      if (escapePressed(keyCode)) {
        event.preventDefault()
        store.dispatch({ type: 'ESCAPE' })
      }

      if (spacePressed(keyCode) && props.filter.text === '') {
        event.preventDefault()
        store.dispatch({ type: 'TOGGLE' })
      }
    })
  }, [])

  useEffect(() => {
    props.filter.title === '' ? setDisplay(false) : setDisplay(true)
  }, [props.filter.title])

  const handleSearch = (event) => {
    event.preventDefault()
    store.dispatch({ type: 'FILTER', title: event.target.value })
  }

  return (
    <form
      css={[
        styles.search,
        display ? styles.show : styles.hide
      ]}
    >
      <CloseButton />
      <input
        ref={inputEl}
        type="text"
        value={props.filter.text}
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

