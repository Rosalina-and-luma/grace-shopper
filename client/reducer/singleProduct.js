import axios from 'axios'

//action type
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//action creator
const getSingleProduct = product => {
  console.log('data in getSingleProduct', product)
  return {
    type: GET_SINGLE_PRODUCT,
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
    default:
      return state
  }
}

export default singleProductReducer
