import { useTheme } from '@emotion/react'

const formatNumber = number => number.toString().padStart(2, '0')

export const Track = props => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <li css={styles.li} onClick={props.onClick}>
      <span css={styles.no}>{formatNumber(props.number)}</span>
      <span css={[styles.span, props.isPlaying ? styles.current : {}]}>
        {props.title}
      </span>
    </li>
  )
}

const getStyles = ({ colors }) => ({
  current: {
    borderBottom: '2px solid white',
  },
  li: {
    ':hover': {
      background: colors.main.opaque,
    },
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
})
