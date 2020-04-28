import React from 'react'
import {Link} from 'react-router-dom'
import './cart.css'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render() {
    return (
      <div id="shopping-cart">
        <Link to="/cart">
          <span className="p1 fa-stack fa-2x has-badge" data-count="#">
            <i className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse" />
          </span>
        </Link>
      </div>
    )
  }
}

export default Cart
