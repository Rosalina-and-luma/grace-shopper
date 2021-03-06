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

export const updateOrderQuantityToServer = data => {
  return async dispatch => {
    try {
      await axios.put('/api/orders/quantity', {
        orderId: data.orderId,
        productId: data.productId,
        quantity: data.quantity
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProductInventoryToServer = data => {
  return async dispatch => {
    try {
      await axios.put('/api/orders/inventory', {
        productId: data.productId,
        inventory: data.inventory
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCartServer = order => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', {
        productId: order.productId,
        quantity: order.quantity
      })
      dispatch(addToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getOrdersFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders`)
      dispatch(getOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteProdFromOrderServer = data => {
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

export const handleLocalStorage = data => {
  let updateExistingFlag = false
  let newOrder = {
    id: data.productId,
    name: data.name,
    imgUrl: data.imgUrl,
    quantity: data.quantity,
    description: data.description,
    price: data.price,
    inventory: data.inventory - 1,
    subTotal: data.price * data.quantity
  }
  //checking if products already exists in localStorage
  if (
    localStorage.getItem('products') &&
    localStorage.getItem('products').length
  ) {
    let currentOrders = JSON.parse(localStorage.getItem('products'))

    //checking if the product user is trying to buy is already in storage, if it is already there, increase the quantity by 1
    let updatedExisitngOrder = currentOrders.map(order => {
      if (order.id === data.productId) {
        if (order.inventory >= 1) {
          order.quantity += 1
          order.subTotal = order.quantity * order.price
          order.inventory -= 1
        }
        updateExistingFlag = true
      }
      return order
    })
    if (updateExistingFlag) {
      localStorage.setItem(
        'products',
        JSON.stringify([...updatedExisitngOrder])
      )
    } else {
      let result = [...currentOrders, newOrder]
      localStorage.setItem('products', JSON.stringify(result))
    }
  } else {
    localStorage.setItem('products', JSON.stringify([newOrder]))
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
