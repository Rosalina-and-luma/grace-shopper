import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'

const addToCart = data => {
  return {
    type: ADD_TO_CART,
    data
  }
}

export const addToCartServer = order => {
  console.log('order placed', order)
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/order', {
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity
      })
      console.log('returned data', data)
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  orders: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        orders: [...state.orders, ...action.data]
      }
    default:
      return state
  }
}

export default orderReducer
