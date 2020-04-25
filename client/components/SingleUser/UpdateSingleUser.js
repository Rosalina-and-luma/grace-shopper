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
  }

  componentDidMount() {}

  render() {
    const {firstName, lastName, email} = this.state

    return (
      <form>
        <label htmlFor="firstName">First Name:</label>
        <input name="firstName" type="text" value={firstName} />
        <label htmlFor="lastName">Last Name:</label>
        <input name="lastName" type="text" value={lastName} />
        <label htmlFor="email">Email:</label>
        <input name="email" type="text" value={email} />
        <button type="submit">Update</button>
      </form>
    )
  }
}

export default UpdateUser
