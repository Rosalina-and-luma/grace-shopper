import React from 'react'
import {connect} from 'react-redux'
import {getAllUsersfromServer} from '../../reducer/users'

class Users extends React.Component {
  componentDidMount() {
    const {getUsers} = this.props
    getUsers()
  }

  render() {
    const {users, isLoading} = this.props
    console.log('in render', this.props)

    if (isLoading) return <h1> Loading...</h1>

    return (
      <div>
        {users.map(user => {
          return (
            <div key={user.id}>
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.newUser.users,
    isLoading: state.newUser.isLoading
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getAllUsersfromServer())
  }
}

export default connect(mapState, mapDispatch)(Users)
