import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_BROOMS = 'GET_BROOMS'
const GET_WANDS = 'GET_WANDS'

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

export const getWands = wands => {
  return {
    type: GET_WANDS,
    wands
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

export const fetchWandsFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/wands')
      dispatch(getWands(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  isLoading: true,
  products: [],
  brooms: [],
  wands: []
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
      let allBrooms
      if (state.products.length) {
        let allProducts = [...state.products]
        allBrooms = allProducts.filter(product => {
          if (product.category === 'broom') {
            return product
          }
        })
      } else {
        allBrooms = action.brooms
      }
      return {
        ...state,
        brooms: allBrooms,
        isLoading: false
      }
    }
    case GET_WANDS: {
      let allWands
      if (state.products.length) {
        let allProducts = [...state.products]
        allWands = allProducts.filter(product => {
          if (product.category === 'wand') {
            return product
          }
        })
      } else {
        allWands = action.wands
      }
      return {
        ...state,
        wands: allWands,
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
