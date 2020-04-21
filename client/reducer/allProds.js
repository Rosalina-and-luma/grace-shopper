import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const fetchProductsFromServer = () => {
  console.log('hi')
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      console.log(data)
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {
  isLoading: true,
  products: []
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        isLoading: false
      }
    default:
      return state
  }
}
