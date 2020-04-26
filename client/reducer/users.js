import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getAllUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
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
