import axios from 'axios'

//action type
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creator
const getSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

const updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

//thunk
export const fetchSingleProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getSingleProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProductOnServer = product => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateProduct(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

//inital state
const initialState = {
  isLoading: true,
  selectedProduct: {}
}

//reducer
const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        selectedProduct: action.product,
        isLoading: false
      }
    case UPDATE_PRODUCT:
      return {...state, selectedProduct: action.product}
    default:
      return state
  }
}

export default singleProductReducer
