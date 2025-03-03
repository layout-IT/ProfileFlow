// store.js
import { createStore, combineReducers } from 'redux'
import defReducer from '../reducers/defReducer'

const rootReducer = combineReducers({
  def: defReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
