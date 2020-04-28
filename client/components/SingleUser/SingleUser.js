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
    this.hideForm = this.hideForm.bind(this)
  }

  showForm() {
    this.setState({
      showForm: true
    })
  }

  hideForm() {
    this.setState({
      showForm: false
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
          <UpdateUser user={user} hideForm={this.hideForm} />
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

export default connect(mapState)(SingleUser)
