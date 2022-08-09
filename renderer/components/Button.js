export const Button = props => (
  <button
    css={[styles.base, props.disabled ? styles.disabled : {}]}
    disabled={props.disabled}
    onClick={props.callback}
    type={props.type}
  >
    {props.value}
  </button>
)

const styles = {
  base: {
    ':hover': {
      background: 'rgba(255, 255, 255, 0.8)',
    },
    appearance: 'none',
    background: 'white',
    border: 'none',
    borderRadius: '.2em',
    boxShadow: '.2em .2em 0px rgba(0, 0, 0, .1)',
    boxSizing: 'border-box',
    color: 'rgba(92, 67, 232, .8)',
    cursor: 'pointer',
    display: 'block',
    fontSize: '100%',
    fontWeight: 600,
    letterSpacing: '.1em',
    margin: 'auto',
    outline: 'none',
    padding: '1em 1em',
    textTransform: 'uppercase',
    transition: 'background .25s, color .25s',
    width: 'calc(100% - 1em)',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: '.5',
  },
}
