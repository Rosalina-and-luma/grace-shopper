import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const fetchProductsFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
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
        isLoading: false,
        products: action.products
      }
    default:
      return state
  }
}

//   export default function productsReducer(products = [], action) {
//     switch (action.type) {
//       case GET_PRODUCTS:
//         return action.products
//       default:
//         return products
//     }
// }
