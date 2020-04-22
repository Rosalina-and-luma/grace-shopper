import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_BROOMS = 'GET_BROOMS'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const getBrooms = brooms => {
  console.log('GET BROOMS CALLED')
  return {
    type: GET_BROOMS,
    brooms
  }
}

export const fetchProductsFromServer = () => {
  console.log('fetch products called')
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchBroomsFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/brooms')
      dispatch(getBrooms(data))
    } catch (error) {
      console.error(error)
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
      /*
        if this.state.products is not empty:
          this.state.brooms = filter products
        else
          this.state.brooms = get from backend
      */
      let allBrooms
      if (state.products.length) {
        console.log(' in if--------')
        let allProducts = [...state.products]
        allBrooms = allProducts.filter(product => {
          if (product.category === 'broom') {
            return product
          }
        })
      } else {
        console.log('EXISTING BROOMS', action.brooms)
        allBrooms = action.brooms
      }
      console.log('ALL BROOOOOOMSSS', allBrooms)
      return {
        ...state,
        brooms: allBrooms,
        isLoading: false
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
