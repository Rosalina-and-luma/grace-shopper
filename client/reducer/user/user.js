import axios from 'axios'

const SIGNUP_USER = 'SIGNUP_USER'
const GET_ALL_USERS = 'GET_ALL_USERS'

const signupUser = user => {
  return {
    type: SIGNUP_USER,
    user
  }
}

const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
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

export const getAllUsersfromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getAllUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {
  isLoading: true,
  users: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.user]
      }
    case GET_ALL_USERS:
      return {
        ...state,
        isLoading: false,
        users: action.users
      }
    default:
      return state
  }
}

export default userReducer
