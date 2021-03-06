import React from 'react'
import {connect} from 'react-redux'
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

  async handleSubmit(event) {
    event.preventDefault()
    const {user, updateUser, hideForm} = this.props
    const updatedUser = this.state
    await updateUser(updatedUser, user.id)
    hideForm()
  }

  render() {
    const {firstName, lastName, email} = this.state

    return (
      <div className="edit-user-form">
        <form onSubmit={this.handleSubmit}>
          <div className="name-container">
            <label htmlFor="firstName">First Name:</label>
            <input
              name="firstName"
              type="text"
              onChange={this.handleChange}
              value={firstName}
            />
          </div>

          <div className="name-container">
            <label htmlFor="lastName">Last Name:</label>
            <input
              name="lastName"
              type="text"
              onChange={this.handleChange}
              value={lastName}
            />
          </div>

          <div className="name-container">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="text"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
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
