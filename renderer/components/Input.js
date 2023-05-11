import theme from '../utils/theme'
import { useAccentColor } from '../hooks'

export const Input = props => {
  const accent = useAccentColor()

  return (
    <div css={styles.base}>
      <div css={styles.inputContainer}>
        {props.label && <label css={styles.label}>{props.label}</label>}
        <input
          css={styles.input}
          data-label={props.label}
          onChange={props.onChange}
          required={props.required}
          style={{ background: accent.opaque }}
          type={props.type || 'text'}
          value={props.value}
        />
      </div>
    </div>
  )
}

const styles = {
  base: {
    boxSizing: 'border-box',
    flex: '1 1 100%',
    margin: 'auto',
    width: '100%',
  },
  input: {
    appearance: 'none',
    border: 'none',
    boxShadow: 'none',
    boxSizing: 'border-box',
    color: theme.textColor,
    display: 'block',
    fontFamily: theme.font,
    fontSize: '150%',
    marginBottom: '1em',
    outline: 'none',
    padding: '.5em',
    transition: 'border .666s',
    width: '100%',
  },
  inputContainer: {
    padding: '0 .5em',
  },
  label: {
    display: 'block',
    fontSize: '90%',
    margin: '1em auto .5em',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
}
