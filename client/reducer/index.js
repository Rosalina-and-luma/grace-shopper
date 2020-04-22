import {combineReducers} from 'redux'
import productsReducer from './allProds'

const appReducer = combineReducers({
  allProducts: productsReducer,
  singleProduct: singleProductReducer
})

export default appReducer
