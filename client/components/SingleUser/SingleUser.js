import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import UpdateUser from './UpdateSingleUser'

class SingleUser extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false
    }
    this.showForm = this.showForm.bind(this)
  }

  showForm() {
    this.setState({
      showForm: true
    })
  }

  render() {
    const {user} = this.props

    if (!user.firstName) return <h1>loading....</h1>

    return (
      <div>
        <h1>Hi {user.firstName}!</h1>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>email: {user.email}</p>
        {this.state.showForm ? (
          <UpdateUser user={user} />
        ) : (
          <button type="button" onClick={this.showForm}>
            Edit My Info
          </button>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

// const mapDispatch = dispatch => {
//   return {

//   }
// }

export default connect(mapState)(SingleUser)
