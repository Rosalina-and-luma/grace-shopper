import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_ORDERS = 'GET_ORDERS'

const addToCart = data => {
  return {
    type: ADD_TO_CART,
    data
  }
}

const getOrders = orders => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const addToCartServer = order => {
  console.log('order placed', order)
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', {
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

export const getOrdersFromServer = userId => {
  console.log('userID', userId)
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      console.log('--------orders data from server---------', data)
      dispatch(getOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  allOrders: [],
  orders: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        orders: [...state.orders, action.data]
      }
    case GET_ORDERS:
      return {
        ...state,
        allOrders: action.orders
      }
    default:
      return state
  }
}

export default orderReducer
