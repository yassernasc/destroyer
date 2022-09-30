import { useTheme } from '@emotion/react'

export const Bar = () => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return <nav css={styles.base} />
}

const getStyles = ({ colors }) => ({
  base: {
    ':hover': {
      backgroundColor: colors.main.opaque,
    },
    height: '1.5em',
    left: 0,
    position: 'fixed',
    top: 0,
    transition: '.5s',
    WebkitAppRegion: 'drag',
    width: '100vw',
    zIndex: 100,
  },
})
