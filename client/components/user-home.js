import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  // const {email} = props

  return (
    <div>
      <h3>Welcome</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
// return {
//   email: state.user.email,
// }
// }

export default connect(null)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
