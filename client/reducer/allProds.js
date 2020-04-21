import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const fetchCapmpusesFromServer = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (err){
      console.error(err)
    }
  }
}

export default function productsReducer (products = [], action){
  switch(action.type){
    case GET_PRODUCTS:
      return action.products
    default:
      return products
  }
}

