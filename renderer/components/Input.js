export const Input = props => (
  <div css={styles.base}>
    <div css={{ padding: '0 .5em' }}>
      {props.label && <label css={styles.label}>{props.label}</label>}
      <input
        type={props.type || 'text'}
        css={styles.input}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        data-label={props.label}
      />
    </div>
  </div>
)

const styles = {
  base: {
    boxSizing: 'border-box',
    flex: '1 1 100%',
    margin: 'auto',
    width: '100%',
  },
  input: {
    appearance: 'none',
    background: 'rgba(92, 67, 232, .8)',
    border: 'none',
    boxShadow: 'none',
    boxSizing: 'border-box',
    color: 'white',
    display: 'block',
    fontFamily: 'AveriaSerif-Light',
    fontSize: '150%',
    marginBottom: '1em',
    outline: 'none',
    padding: '.5em',
    transition: 'border .666s',
    width: '100%',
  },
  label: {
    display: 'block',
    fontSize: '90%',
    margin: '1em auto .5em',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
}
