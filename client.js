import ReactDOM from 'react-dom'
import App from './components/app'
import Menu from './components/menu'
import Player from './components/player'
import { combineReducers, createStore } from 'redux'
import { adminReducer } from './components/admin/reducer.js'
import { filterReducer } from './components/keyboard/reducer.js'
import { libraryReducer } from './components/library/reducer.js'
import { loadingReducer } from './components/loading/reducer.js'
import { playerReducer } from './components/player/reducer.js'
import { showcaseReducer } from './components/showcase/reducer.js'
import { devToolsEnhancer } from '@redux-devtools/extension'

const reducers = combineReducers({
  admin: adminReducer,
  filter: filterReducer,
  library: libraryReducer,
  loading: loadingReducer,
  player: playerReducer,
  showcase: showcaseReducer,
})

export const store = createStore(reducers, devToolsEnhancer())

const render = () => {
  ReactDOM.render(
    <App {...store.getState()} />,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()

new Menu()
