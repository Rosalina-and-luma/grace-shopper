import React from 'react'
import {connect} from 'react-redux'

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {user} = this.props
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {firstName, lastName, email} = this.state
    const {user} = this.props
    console.log(user)

    return (
      <form>
        <label htmlFor="firstName">First Name:</label>
        <input
          name="firstName"
          type="text"
          onChange={this.handleChange}
          value={firstName}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          type="text"
          onChange={this.handleChange}
          value={lastName}
        />
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="text"
          onChange={this.handleChange}
          value={email}
        />
        <button type="submit">Update</button>
      </form>
    )
  }
}

export default UpdateUser
