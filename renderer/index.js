import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import storage from 'redux-persist/lib/storage'

import { App } from './components/app'
import adminReducer from './reducers/admin'
import lastfmReducer from './reducers/lastfm'
import libraryReducer from './reducers/library'
import notificationReducer from './reducers/notification'
import playerReducer from './reducers/player'
import showcaseReducer from './reducers/showcase'

const reducer = combineReducers({
  admin: adminReducer,
  lastfm: lastfmReducer,
  library: libraryReducer,
  notification: notificationReducer,
  player: playerReducer,
  showcase: showcaseReducer,
})

const persistConfig = { key: 'store', storage }
const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
  devTools: { actionsDenylist: 'player/tick' },
  reducer: persistedReducer,
})
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
