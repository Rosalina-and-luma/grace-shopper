import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="nav-page">
    <Link to="/">
      <h1>Diagon E-lley 🧙🏼‍♂️</h1>
    </Link>
    <nav className="nav-bar">
      <Link to="/products">All Products</Link>
      <Link to="/products?category=robes">Robes</Link>
      <Link to="/products?category=wands">Wands</Link>
      <Link to="/products?category=brooms">Brooms</Link>
      <Link to="/products?category=misc">Misc</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/signup">Sign-Up</Link>

      {isLoggedIn ? (
        <div>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      {isAdmin ? (
        <div>
          <Link to="/user">Users</Link>
        </div>
      ) : null}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
