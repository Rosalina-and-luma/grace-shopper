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

const deleteProdFromOrder = data => {
  // console.log('last step', orderId, productId)
  return {
    type: DELETE_PROD_FROM_ORDER,
    orderId: data.orderId,
    productId: data.productId
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
  // console.log()
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

// export const removeItemFromCart = itemId => {
//   return async dispatch => {
//     try {

//     } catch (error) {
//       console.error(error)
//     }
//   }
// }
export const deleteProdFromOrderServer = data => {
  // console.log('******', 'orderId', orderId, 'productId', productId)
  return async dispatch => {
    try {
      await axios.delete('/api/orders', {
        data: {
          orderId: data.orderId,
          productId: data.productId
        }
      })
      dispatch(deleteProdFromOrder(data))
    } catch (error) {
      // console.error(error)
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
    case DELETE_PROD_FROM_ORDER: {
      const oldOrders = _.cloneDeep(state.allOrders)
      let updatedProducts = []
      let updatedOrderProducts = []
      const newOrders = oldOrders.filter(order => {
        if (order.id === action.orderId) {
          let products = order.products
          for (let i = 0; i < products.length; i++) {
            if (products[i].id !== action.productId) {
              updatedProducts.push(products[i])
              updatedOrderProducts.push(order.order_products[i])
            }
          }
          order.products = [...updatedProducts]
          order.order_products = [...updatedOrderProducts]
          return order
        } else return order
      })

      return {
        ...state,
        allOrders: [...newOrders]
      }
    }
    default:
      return state
  }
}

export default orderReducer
