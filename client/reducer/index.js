import {combineReducers} from 'redux'
import productsReducer from './allProds'
import singleProductReducer from './singleProduct'
import userReducer from './user/user'

const appReducer = combineReducers({
  allProducts: productsReducer,
  singleProduct: singleProductReducer,
  user: userReducer
})

export default appReducer
