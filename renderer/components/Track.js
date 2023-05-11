import { useHoverDirty } from 'react-use'
import { useRef } from 'react'

import { useAccentColor } from '../hooks'

const formatNumber = number => number.toString().padStart(2, '0')

export const Track = props => {
  const ref = useRef(null)
  const hovering = useHoverDirty(ref)
  const accent = useAccentColor()

  return (
    <li
      css={styles.li}
      onClick={props.onClick}
      ref={ref}
      style={hovering ? { background: accent.opaque } : {}}
    >
      <span css={styles.no}>{formatNumber(props.number)}</span>
      <span css={[styles.span, props.isPlaying ? styles.current : {}]}>
        {props.title}
      </span>
    </li>
  )
}

const styles = {
  current: {
    borderBottom: '2px solid white',
  },
  li: {
    cursor: 'pointer',
    display: 'block',
    margin: 0,
    padding: '.5em 1em',
    transition: 'background .25s',
  },
  no: {
    padding: '0 .5em',
  },
  span: {
    fontWeight: 'bold',
    padding: '0 .25em',
  },
}
