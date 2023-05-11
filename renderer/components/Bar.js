import { useHoverDirty } from 'react-use'
import { useRef } from 'react'

import { useAccentColor } from '../hooks'

export const Bar = () => {
  const ref = useRef(null)
  const hovering = useHoverDirty(ref)
  const accent = useAccentColor()

  return (
    <nav
      css={styles.base}
      ref={ref}
      style={hovering ? { backgroundColor: accent.opaque } : {}}
    />
  )
}

const styles = {
  base: {
    height: '1.5em',
    left: 0,
    position: 'fixed',
    top: 0,
    transition: '.5s',
    WebkitAppRegion: 'drag',
    width: '100vw',
    zIndex: 100,
  },
}
