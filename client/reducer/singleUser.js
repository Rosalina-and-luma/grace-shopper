import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SIGNUP_USER = 'SIGNUP_USER'
const UPDATE_USER = 'UPDATE USER'

const getUser = user => ({type: GET_USER, user})

const removeUser = () => ({type: REMOVE_USER})

const signupUser = user => {
  return {
    type: SIGNUP_USER,
    user
  }
}

const updateUser = user => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/products')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addUserToServer = user => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/users', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
      })
      dispatch(signupUser(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateUserInServer = (updatedUser, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`api/users/${userId}`, updatedUser)
      console.log(data)
      dispatch(updateUser(data, userId))
    } catch (error) {
      console.log('in error')
      console.error(error)
    }
  }
}

const defaultUser = {}

export default function getUserReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case SIGNUP_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}
