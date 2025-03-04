// store.js
import { createStore, combineReducers } from 'redux'

import AuthorReducer from '../reducers/AuthorReducer'
import QuoteReducer from '../reducers/QuoteReducer'
import UserReducer from '../reducers/UserReducer'

const rootReducer = combineReducers({
  user: UserReducer,
  author: AuthorReducer,
  quote: QuoteReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
