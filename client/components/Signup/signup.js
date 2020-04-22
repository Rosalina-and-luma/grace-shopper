import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addUserToServer} from '../../reducer/user/user'
import './signup.css'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="signup-form">
        <label>
          First Name
          {!this.state.firstName.trim() && (
            <span className="warning">(Field is required!)</span>
          )}
        </label>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <br />

        <label>
          Last Name
          {!this.state.lastName.trim() && (
            <span className="warning">(Field is required!)</span>
          )}
        </label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <br />

        <label>
          Email
          {!this.state.email.trim() && (
            <span className="warning">(Field is required!)</span>
          )}
        </label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <br />
        <label>
          Password
          {!this.state.password.trim() && (
            <span className="warning">(Field is required!)</span>
          )}
        </label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <button
          type="button"
          onClick={() => {
            this.props.addUser({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              password: this.state.password
            })
          }}
        >
          {' '}
          Signup
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => {
      dispatch(addUserToServer(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(Signup)
