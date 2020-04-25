import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUserFromServer} from '../../reducer/singleUser'

class SingleUser extends React.Component {
  render() {
    const {user} = this.props
    console.log('props', this.props)

    if (!user.firstName) return <h1>loading....</h1>

    return (
      <div>
        <h1>Hi {user.firstName}!</h1>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>email: {user.email}</p>
        <button type="button">Edit My Info</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(getUserFromServer())
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
