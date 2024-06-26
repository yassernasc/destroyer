export const CloseButton = ({ onClick }) => {
  return (
    <div css={styles.base} onClick={onClick}>
      <svg css={styles.svg} viewBox="0 0 63.8 63.7">
        <path d="M61.3 63.7c-.6 0-1.3-.2-1.8-.7L.7 4.3c-1-1-1-2.6 0-3.5 1-1 2.6-1 3.5 0L63 59.5c1 1 1 2.6 0 3.5-.5.5-1.1.7-1.7.7z" />
        <path d="M2.5 63.7c-.6 0-1.3-.2-1.8-.7-1-1-1-2.6 0-3.5L59.5.7c1-1 2.6-1 3.5 0 1 1 1 2.6 0 3.5L4.3 63c-.5.5-1.2.7-1.8.7z" />
      </svg>
    </div>
  )
}

const styles = {
  base: {
    color: 'white',
    cursor: 'pointer',
    fontSize: '200%',
    fontWeight: '200',
    height: '1em',
    position: 'fixed',
    right: '1em',
    top: '1em',
    width: '1em',
    zIndex: 80,
  },
  svg: {
    ':hover': {
      fill: 'red',
    },
    fill: 'white',
    height: '1em',
    transition: '.5s',
    width: '1em',
  },
}
