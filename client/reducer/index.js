import {combineReducers} from 'redux'
import productsReducer from './allProds'
import singleProductReducer from './singleProduct'

const appReducer = combineReducers({
  allProducts: productsReducer,
  singleProduct: singleProductReducer
})

export default appReducer
