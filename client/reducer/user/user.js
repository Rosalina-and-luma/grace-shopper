import axios from 'axios'

const SIGNUP_USER = 'SIGNUP_USER'

const signupUser = user => {
  return {
    type: SIGNUP_USER,
    user
  }
}

export const addUserToServer = user => {
  console.log('server called with user', user)
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

const initialState = {
  users: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    default:
      return state
  }
}

export default userReducer
