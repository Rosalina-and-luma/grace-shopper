/* eslint-disable complexity */
import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//action creators
const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

const updateProduct = product => {
  const {id, name, imgUrl, description, price, categoryId, inventory} = product
  return {
    type: UPDATE_PRODUCT,
    id,
    name,
    imgUrl,
    description,
    price,
    categoryId,
    inventory
  }
}

const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

//thunk creators
export const fetchProductsFromServer = categoryName => {
  const path =
    '/api/products' + (categoryName ? `?category=${categoryName}` : '')

  return async dispatch => {
    try {
      const {data} = await axios.get(path)
      dispatch(getProducts(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const createProductOnServer = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(createProduct(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const updateProductOnServer = product => {
  return async dispatch => {
    try {
      const {
        id,
        name,
        imgUrl,
        description,
        price,
        categoryId,
        inventory
      } = product
      const {data} = await axios.put(`/api/products/${id}`, {
        name,
        imgUrl,
        description,
        price,
        categoryId,
        inventory
      })
      dispatch(updateProduct(data))
    } catch (err) {
      console.error(err.message)
    }
  }
}

export const deleteFromServer = id => {
  return async dispatch => {
    try {
      await axios.delete(`api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (err) {
      console.error(err.message)
    }
  }
}

//reducer

const initialState = {
  isLoading: true,
  products: []
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.products
      }
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product]
      }
    case UPDATE_PRODUCT: {
      let oldProducts = [...state.products]
      let updatedProducts = oldProducts.map(product => {
        if (product.id === action.id) {
          return {
            id: action.id,
            name: action.name,
            imgUrl: action.imgUrl,
            description: action.description,
            price: action.price,
            categoryId: action.categoryId,
            inventory: action.inventory
          }
        } else return product
      })
      return {
        ...state,
        products: [...updatedProducts]
      }
    }
    case DELETE_PRODUCT: {
      const oldProducts = [...state.products]
      const newProducts = oldProducts.filter(
        product => product.id !== action.id
      )
      return {
        ...state,
        products: [...newProducts]
      }
    }
    default:
      return state
  }
}
