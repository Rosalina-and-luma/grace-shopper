import {combineReducers} from 'redux'
import singleProductReducer from './singleProduct'

const appReducer = combineReducers({
  singleProduct: singleProductReducer
})

export default appReducer
