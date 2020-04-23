import {combineReducers} from 'redux'
import productsReducer from './allProds'
import singleProductReducer from './singleProduct'
import userReducer from './user/user'
import orderReducer from './order/order'
import getUserReducer from './user'

const appReducer = combineReducers({
  allProducts: productsReducer,
  singleProduct: singleProductReducer,
  newUser: userReducer,
  user: getUserReducer,
  order: orderReducer
})

export default appReducer
