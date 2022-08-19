import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'

import { App } from './components/app'
import adminReducer from './reducers/admin'
import lastfmReducer from './reducers/lastfm'
import libraryReducer from './reducers/library'
import playerReducer from './reducers/player'
import showcaseReducer from './reducers/showcase'

export const store = configureStore({
  devTools: { actionsDenylist: 'player/tick' },
  reducer: {
    admin: adminReducer,
    lastfm: lastfmReducer,
    library: libraryReducer,
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
