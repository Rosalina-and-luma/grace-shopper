import React from 'react'
import {NavLink} from 'react-router-dom'

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
            userId: props.userId,
            productId: props.product.id,
            quantity: 10,
            purchased: false
          })
        }}
      >
        Buy
      </button>
    </div>
  )
}

export default AllProductsUI
