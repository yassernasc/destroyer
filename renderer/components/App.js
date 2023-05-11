import { Global } from '@emotion/react'

import { Admin } from './Admin'
import { Bar } from './Bar'
import { FilterInput } from './FilterInput'
import { Library } from './Library'
import { Notification } from './Notification'
import { Player } from './Player'
import { Showcase } from './Showcase'
import { Status } from './Status'
import averiaSerif from '../assets/averia-serif.woff2'
import theme from '../utils/theme'

export const App = () => {
  return (
    <>
      <Global styles={styles} />
      <Bar />
      <Admin />
      <Library />
      <Showcase />
      <Status />
      <Notification />
      <Player />
      <FilterInput />
    </>
  )
}

const styles = {
  '::selection': {
    backgroundColor: theme.baseColor,
    opacity: 0,
  },
  body: {
    color: theme.textColor,
    fontFamily: theme.font,
    lineHeight: 1.5,
    margin: 0,
    padding: 0,
  },
  button: {
    fontFamily: theme.font,
  },
  html: {
    '@font-face': {
      fontFamily: theme.font,
      src: `url(${averiaSerif})`,
    },
    textSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
  },
  input: {
    fontFamily: theme.font,
  },
}
