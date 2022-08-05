const formatNumber = number => number.toString().padStart(2, '0')

export const Track = props => (
  <li css={styles.li} onClick={() => props.onClick(props.number)}>
    <span css={styles.no}>{formatNumber(props.number)}</span>
    <span css={[styles.span, props.current ? styles.current : '']}>
      {props.title}
    </span>
  </li>
)

const styles = {
  li: {
    display: 'block',
    margin: 0,
    padding: '.5em 1em',
    cursor: 'pointer',
    transition: 'background .25s',
    ':hover': {
      background: 'rgba(92, 67, 232, .8)',
    },
  },
  no: {
    padding: '0 .5em',
  },
  span: {
    padding: '0 .25em',
    fontWeight: 'bold',
  },
  current: {
    borderBottom: '2px solid white',
  },
}
