import {combineReducers} from 'redux'
import productsReducer from './allProds'
import singleProductReducer from './singleProduct'
import userReducer from './users'
import getUserReducer from './singleUser'

const appReducer = combineReducers({
  allProducts: productsReducer,
  singleProduct: singleProductReducer,
  newUser: userReducer,
  user: getUserReducer
})

export default appReducer
