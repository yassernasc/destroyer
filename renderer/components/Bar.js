export const Bar = () => <nav css={styles.base} />

const styles = {
  base: {
    ':hover': {
      backgroundColor: 'rgba(92, 67, 232, .8)',
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
}
