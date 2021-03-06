import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import Cart from '../Cart/cart'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="nav-page">
    <Link to="/">
      <h1>Diagon E-lley 🧙🏼‍♂️</h1>
    </Link>
    <nav className="nav-bar">
      <div className="navbar-left">
        <Link to="/products">All Products</Link>
        <Link to="/products?category=robes">Robes</Link>
        <Link to="/products?category=wands">Wands</Link>
        <Link to="/products?category=brooms">Brooms</Link>
        <Link to="/products?category=misc">Misc</Link>
      </div>

      <div className="navbar-right">
        <Cart />
        <div className="admin-view">
          <div>
            {isLoggedIn ? (
              <div>
                <Link to="/order-history">Order History</Link>
                <Link to="/account">My Account</Link>
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
          </div>
          <div>
            {isAdmin ? (
              <div>
                <Link to="/user">Users</Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
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
