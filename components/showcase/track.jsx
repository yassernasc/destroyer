import leftpad from 'leftpad'
import { store } from '../../client.js'

const Track = props => {
  const handleClick = () => window.player.playTrack(props.track)

  return (
    <li css={styles.li} onClick={handleClick}>
      <span css={styles.no}>{leftpad(props.track.track.no, 2)}</span>
      <span
        css={[
          styles.span,
          props.player.track === props.track ? styles.current : ''
        ]}
      >
        {props.track.title}
      </span>
    </li>
  )
}

export default Track

const styles = {
  li: {
    display: 'block',
    margin: 0,
    padding: '.5em 1em',
    cursor: 'pointer',
    transition: 'background .25s',
    ':hover': {
      background: 'rgba(92, 67, 232, .8)'
    }
  },
  no: {
    padding: '0 .5em'
  },
  span: {
    padding: '0 .25em',
    fontWeight: 'bold'
  },
  current: {
    borderBottom: '2px solid white'
  }
}
