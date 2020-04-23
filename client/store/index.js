import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import user from './user'
import appReducer from '../reducer'
import {fetchProductsFromServer} from '../reducer/allProds'

const reducer = appReducer
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

// store.dispatch(fetchProductsFromServer())

// console.log('store', store)

export default store
export * from '../reducer/user'
