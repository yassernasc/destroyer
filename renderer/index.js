import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import storage from 'redux-persist/lib/storage'

import { App } from './components/App'
import adminReducer from './reducers/admin'
import envReducer from './reducers/env'
import lastfmReducer from './reducers/lastfm'
import libraryReducer from './reducers/library'
import notificationReducer from './reducers/notification'
import playerReducer from './reducers/player'
import showcaseReducer from './reducers/showcase'
import themeReducer from './reducers/theme'

const reducer = combineReducers({
  admin: adminReducer,
  env: envReducer,
  lastfm: lastfmReducer,
  library: libraryReducer,
  notification: notificationReducer,
  player: playerReducer,
  showcase: showcaseReducer,
  theme: themeReducer,
})

const persistConfig = { key: 'store', storage }
const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
  devTools: { actionsDenylist: 'player/tick' },
  reducer: persistedReducer,
})
const persistor = persistStore(store)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
