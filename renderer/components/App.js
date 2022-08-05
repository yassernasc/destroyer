import { Global } from '@emotion/react'

import averiaSerif from '../assets/averia-serif.woff2'
import { Loading } from './Loading'
import { Admin } from './Admin'
import { Bar } from './Bar'
import { FilterInput } from './Keyboard'
import { Status } from './Status'
import { Library } from './Library'
import { Showcase } from './Showcase'
import { Player } from './Player'

export const App = () => (
  <>
    <Global styles={styles} />
    <Bar />
    <Admin />
    <Library />
    <Showcase />
    <Status />
    <Loading />
    <Player />
    <FilterInput />
  </>
)

const styles = {
  html: {
    textSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
    '@font-face': {
      fontFamily: 'averia-serif',
      src: `url('${averiaSerif}')`,
    },
  },
  body: {
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    fontFamily:
      'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    color: 'white',
    backgroundColor: '#212121',
  },
  input: {
    fontFamily:
      'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  button: {
    fontFamily:
      'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  '::selection': {
    backgroundColor: 'rgba(92, 67, 232, 1)',
    opacity: 0,
  },
}
