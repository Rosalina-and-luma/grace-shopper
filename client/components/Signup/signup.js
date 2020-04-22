import React, {Component} from 'react'
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
    console.log(this.state)
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
          type="text"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <button type="button"> Signup</button>
      </div>
    )
  }
}

export default Signup
