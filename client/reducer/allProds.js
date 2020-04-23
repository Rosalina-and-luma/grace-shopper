/* eslint-disable complexity */
import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_BROOMS = 'GET_BROOMS'
const GET_WANDS = 'GET_WANDS'
const GET_ROBES = 'GET_ROBES'
const GET_MISC = 'GET_MISC'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const getBrooms = brooms => {
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

export const getRobes = robes => {
  return {
    type: GET_ROBES,
    robes
  }
}

export const getMisc = miscItems => {
  return {
    type: GET_MISC,
    miscItems
  }
}

const updateProduct = product => {
  const {id, name, imgUrl, description, price, category, inventory} = product
  return {
    type: UPDATE_PRODUCT,
    id,
    name,
    imgUrl,
    description,
    price,
    category,
    inventory
  }
}

const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    id
  }
}

export const fetchProductsFromServer = () => {
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

export const fetchRobesFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/robes')
      dispatch(getRobes(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const fetchMiscFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/misc')
      dispatch(getMisc(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProductOnServer = product => {
  return async dispatch => {
    try {
      const {name, imgUrl, description, price, category, inventory} = product
      const {data} = await axios.put(
        `/api/products/updateProduct/${product.id}`,
        {
          name,
          imgUrl,
          description,
          price: parseInt(price) * 100,
          category: parseInt(category),
          inventory
        }
      )
      dispatch(updateProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteFromServer = id => {
  return async dispatch => {
    try {
      await axios.delete(`api/products/${id}`)
      dispatch(deleteProduct(id))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  isLoading: true,
  products: [],
  brooms: [],
  wands: [],
  robes: [],
  miscItems: []
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
          if (product.category.name === 'brooms') {
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
          if (product.category.name === 'wands') {
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
    case GET_ROBES: {
      let allRobes
      if (state.products.length) {
        let allProducts = [...state.products]
        allRobes = allProducts.filter(product => {
          if (product.category.name === 'robes') {
            return product
          }
        })
      } else {
        allRobes = action.robes
      }
      return {
        ...state,
        robes: allRobes,
        isLoading: false
      }
    }
    case GET_MISC: {
      let allMiscItems
      if (state.products.length) {
        let allProducts = [...state.products]
        allMiscItems = allProducts.filter(product => {
          if (product.category.name === 'misc') {
            return product
          }
        })
      } else allMiscItems = action.miscItems
      return {
        ...state,
        miscItems: allMiscItems,
        isLoading: false
      }
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
            category: action.category,
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
