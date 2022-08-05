import { Global } from '@emotion/react'

import { Admin } from './Admin'
import { Bar } from './Bar'
import { FilterInput } from './Keyboard'
import { Library } from './Library'
import { Loading } from './Loading'
import { Player } from './Player'
import { Showcase } from './Showcase'
import { Status } from './Status'
import averiaSerif from '../assets/averia-serif.woff2'

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
  '::selection': {
    backgroundColor: 'rgba(92, 67, 232, 1)',
    opacity: 0,
  },
  body: {
    backgroundColor: '#212121',
    color: 'white',
    fontFamily:
      'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1.5,
    margin: 0,
    padding: 0,
  },
  button: {
    fontFamily:
      'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  html: {
    '@font-face': {
      fontFamily: 'averia-serif',
      src: `url('${averiaSerif}')`,
    },
    textSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
  },
  input: {
    fontFamily:
      'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
}
