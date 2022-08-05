import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'

import { App } from './components/app'
import adminReducer from './reducers/admin'
import filterReducer from './reducers/keyboard'
import libraryReducer from './reducers/library'
import loadingReducer from './reducers/loading'
import playerReducer from './reducers/player'
import showcaseReducer from './reducers/showcase'

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
