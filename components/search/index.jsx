import { useEffect, useRef } from 'react'
import key from 'key'
import CloseButton from '../close-button'
import { store } from '../../client.js'

const Search = props => {
  const inputEl = useRef(null)

  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (!props.admin.display) {
        if (key.is(key.code.alnum, event.which) || event.keyCode === 8) {
          inputEl.current.focus()
        }
      }
    })
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    store.dispatch({ type: 'SEARCH', input: event.target.value })
  }

  return (
    <form
      css={[
        styles.search,
        props.search.display ? styles.show : styles.hide
      ]}
    >
      <CloseButton />
      <input
        ref={inputEl}
        type="text"
        value={props.search.input}
        css={styles.input}
        onChange={handleSearch}
      />
    </form>
  )
}

export default Search

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
