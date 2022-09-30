import { Global, ThemeProvider } from '@emotion/react'

import { Admin } from './Admin'
import { Bar } from './Bar'
import { FilterInput } from './FilterInput'
import { Library } from './Library'
import { Notification } from './Notification'
import { Player } from './Player'
import { Showcase } from './Showcase'
import { Status } from './Status'
import averiaSerif from '../assets/averia-serif.woff2'
import { useTheme } from '../hooks'

export const App = () => {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Global styles={styles} />
      <Bar />
      <Admin />
      <Library />
      <Showcase />
      <Status />
      <Notification />
      <Player />
      <FilterInput />
    </ThemeProvider>
  )
}

const styles = ({ colors, font }) => ({
  '::selection': {
    backgroundColor: colors.main.base,
    opacity: 0,
  },
  body: {
    backgroundColor: colors.base,
    color: colors.text,
    fontFamily: font,
    lineHeight: 1.5,
    margin: 0,
    padding: 0,
  },
  button: {
    fontFamily: font,
  },
  html: {
    '@font-face': {
      fontFamily: 'averia-serif',
      src: `url(${averiaSerif})`,
    },
    textSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
  },
  input: {
    fontFamily: font,
  },
})
