import axios from 'axios'
import _ from 'lodash'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_ORDERS = 'GET_ORDERS'
// const REMOVE_ITEM = 'REMOVE_ITEM'
const DELETE_PROD_FROM_ORDER = 'DELETE_PROD_FROM_ORDER'

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
  console.log('getOrders called')
  // console.log()
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(getOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// export const removeItemFromCart = itemId => {
//   return async dispatch => {
//     try {

//     } catch (error) {
//       console.error(error)
//     }
//   }
// }
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
    default:
      return state
  }
}

export default orderReducer
