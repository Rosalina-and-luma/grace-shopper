import {combineReducers} from 'redux'
import productsReducer from './allProds'

const appReducer = combineReducers({
  products: productsReducer
})

export default appReducer
