import axios from 'axios'
import _ from 'lodash'

//action types

const ADD_TO_CART = 'ADD_TO_CART'
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'
const DELETE_PROD_FROM_ORDER = 'DELETE_PROD_FROM_ORDER'

//action creators

const updateOrder = () => {
  return {
    type: UPDATE_ORDER
  }
}

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

const deleteProdFromOrder = () => {
  return {
    type: DELETE_PROD_FROM_ORDER
  }
}

//thunk creators

export const updateOrderToServer = id => {
  return async dispatch => {
    try {
      await axios.put('/api/orders', {id})
      dispatch(updateOrder())
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCartServer = order => {
  console.log('order placed', order)
  return async dispatch => {
    try {
      if (order.orderId) {
        await axios.put('/api/orders/quantity', {quantiyt: order.quantity})
      } else {
        const {data} = await axios.post('/api/orders', {
          // userId: order.userId,
          productId: order.productId,
          quantity: order.quantity
        })
        console.log('returned data', data)
        dispatch(addToCart(data))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const getOrdersFromServer = () => {
  console.log('getOrders called')
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders`)
      console.log('data from server', data)
      dispatch(getOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteProdFromOrderServer = data => {
  console.log('server data', data)
  return async dispatch => {
    try {
      await axios.delete('/api/orders', {
        data: {
          orderId: data.orderId,
          productId: data.productId
        }
      })
      dispatch(deleteProdFromOrder())
    } catch (error) {
      console.error(error)
    }
  }
}

//reducer

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
    case DELETE_PROD_FROM_ORDER:
      return {
        ...state
      }
    case UPDATE_ORDER:
      return {
        ...state
      }
    default:
      return state
  }
}

export default orderReducer
