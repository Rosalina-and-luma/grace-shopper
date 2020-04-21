import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_BROOMS = 'GET_BROOMS'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const getBrooms = () => ({
  type: GET_BROOMS
})

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
  products: [],
  brooms: []
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.products
      }
    case GET_BROOMS: {
      let allProducts = [...state.products]
      let brooms = allProducts.filter(product => {
        if (product.category === 'broom') {
          return product
        }
      })
      return {
        ...state,
        brooms
      }
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
