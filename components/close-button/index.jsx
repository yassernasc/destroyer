import { useDispatch } from 'react-redux'
import { escape } from '../keyboard/reducer'

const CloseButton = () => {
  const dispatch = useDispatch()

  return (
    <div
      css={styles.base}
      onClick={() => dispatch(escape())}
    >
      <svg css={styles.svg} viewBox="0 0 63.8 63.7">
        <path d="M61.3 63.7c-.6 0-1.3-.2-1.8-.7L.7 4.3c-1-1-1-2.6 0-3.5 1-1 2.6-1 3.5 0L63 59.5c1 1 1 2.6 0 3.5-.5.5-1.1.7-1.7.7z" />
        <path d="M2.5 63.7c-.6 0-1.3-.2-1.8-.7-1-1-1-2.6 0-3.5L59.5.7c1-1 2.6-1 3.5 0 1 1 1 2.6 0 3.5L4.3 63c-.5.5-1.2.7-1.8.7z" />
      </svg>
    </div>
  )
} 

export default CloseButton

const styles = {
  base: {
    width: '1em',
    height: '1em',
    fontSize: '200%',
    position: 'fixed',
    fontWeight: '200',
    top: '1em',
    cursor: 'pointer',
    right: '1em',
    zIndex: 80,
    color: 'white'
  },
  svg: {
    width: '1em',
    height: '1em',
    fill: 'white',
    transition: '.5s',
    ':hover': {
      fill: 'red'
    }
  }
}
