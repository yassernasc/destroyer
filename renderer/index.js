import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import App from './components/app'
import adminReducer from './components/admin/reducer.js'
import filterReducer from './components/keyboard/reducer.js'
import libraryReducer from './components/library/reducer.js'
import loadingReducer from './components/loading/reducer.js'
import playerReducer from './components/player/reducer.js'
import showcaseReducer from './components/showcase/reducer.js'

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    filter: filterReducer,
    library: libraryReducer,
    loading: loadingReducer,
    player: playerReducer,
    showcase: showcaseReducer,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
