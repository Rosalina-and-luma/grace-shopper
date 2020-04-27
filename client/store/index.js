import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import user from './user'
import appReducer from '../reducer'
import {updateProductOnServer} from '../reducer/singleProduct'

const reducer = appReducer
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

store.dispatch(
  updateProductOnServer({
    id: 2,
    name: 'Fred Wand',
    price: 500,
    inventory: 20,
    categoryId: 1
  })
)

// console.log('store', store)

export default store
export * from '../reducer/singleUser'
