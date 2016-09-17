import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import Menu from './components/menu'
import Keyboard from './components/keyboard'
import { combineReducers, createStore } from 'redux'
import { adminReducer } from './components/admin/reducer.js'
import { searchReducer } from './components/search/reducer.js'
import { libraryReducer } from './components/library/reducer.js'
import { loadingReducer } from './components/loading/reducer.js'
import { showcaseReducer } from './components/showcase/reducer.js'
import { playerReducer } from './components/player/reducer.js'
import { playbarReducer } from './components/playbar/reducer.js'
import { statusReducer } from './components/status/reducer.js'

const reducers = combineReducers({
  admin: adminReducer,
  library: libraryReducer,
  loading: loadingReducer,
  showcase: showcaseReducer,
  player: playerReducer,
  playbar: playbarReducer,
  status: statusReducer,
  search: searchReducer
})

export const store = createStore(reducers)

const render = () => {
  ReactDOM.render(
    <App
      admin={store.getState().admin}
      library={store.getState().library}
      showcase={store.getState().showcase}
      loading={store.getState().loading}
      status={store.getState().status}
      playbar={store.getState().playbar}
      search={store.getState().search} />,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()

new Menu()
new Keyboard()
