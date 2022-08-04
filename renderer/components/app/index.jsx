import { Global } from '@emotion/react'
import Loading from '../loading'
import Admin from '../admin'
import Bar from '../bar'
import FilterInput from '../keyboard'
import Status from '../status'
import Library from '../library'
import Showcase from '../showcase'
import Player from '../player'
import averiaSerif from './averia-serif.woff2'

const App = () => (
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

export default App

const styles = {
  html: {
    textSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
    '@font-face': {
      'font-family': 'averia-serif',
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
