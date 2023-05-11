import { useHoverDirty } from 'react-use'
import { useRef } from 'react'

import { useAccentColor } from '../hooks'

export const PlaybarButton = ({ children, onClick }) => {
  const ref = useRef(null)
  const hovering = useHoverDirty(ref)

  const accent = useAccentColor()

  return (
    <span
      css={styles.btn}
      onClick={onClick}
      ref={ref}
      style={hovering ? { background: accent.opaque } : {}}
    >
      {children}
    </span>
  )
}

const styles = {
  btn: {
    cursor: 'pointer',
    display: 'inline-block',
    padding: '0 0em 1em',
    transition: '.5s',
    width: '200px',
  },
}
