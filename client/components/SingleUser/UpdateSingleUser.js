import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {updateUserInServer} from '../../reducer/singleUser'

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()
    const {user, updateUser} = this.props
    const updatedStudent = this.state
    updateUser(updatedStudent, user.id)
    // this.setState({
    //   firstName: '',
    //   lastName: '',
    //   email: ''
    // })
  }

  render() {
    const {firstName, lastName, email} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
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

const mapDispatch = dispatch => {
  return {
    updateUser: (updatedUser, userId) =>
      dispatch(updateUserInServer(updatedUser, userId))
  }
}

export default connect(null, mapDispatch)(UpdateUser)
