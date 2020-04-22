import React from 'react'
import {NavLink} from 'react-router-dom'

const AllProductsUI = props => {
  console.log('In UI', props)
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
      <button>Buy</button>
    </div>
  )
}

export default AllProductsUI
