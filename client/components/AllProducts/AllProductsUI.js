import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCartServer} from '../../reducer/order/order'

const AllProductsUI = props => {
  const {product} = props

  return (
    <div>
      <NavLink to={`/products/${product.id}`}>
        <img src={product.imgUrl} height="50px" />
      </NavLink>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <NavLink to={`/products/${product.id}`}>
        <button type="button">View Details</button>
      </NavLink>
      <button
        type="button"
        onClick={() => {
          props.addToCart({
            userId: props.user.id,
            productId: props.product.id,
            quantity: 1
            // purchased: false
          })
        }}
      >
        Buy
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: order => dispatch(addToCartServer(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsUI)
