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
  current: {
    borderBottom: '2px solid white',
  },
  li: {
    ':hover': {
      background: 'rgba(92, 67, 232, .8)',
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
}
