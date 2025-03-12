import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'

import AuthorReducer from './reducers/AuthorReducer'
import QuoteReducer from './reducers/QuoteReducer'
import UserReducer from './reducers/UserReducer'

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  user: UserReducer,
  author: AuthorReducer,
  quote: QuoteReducer,
})

// Подключаем middleware и DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
