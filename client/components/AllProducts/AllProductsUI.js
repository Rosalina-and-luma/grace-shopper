import React from 'react'
import {NavLink} from 'react-router-dom'

const AllProductsUI = props => {
  const {product, isAdmin} = props
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
      <button type="button">Buy</button>
      {isAdmin && (
        <div>
          <NavLink to={`/products/updateProduct/${product.id}`}>
            <button type="button">Edit</button>
          </NavLink>
          <button type="button">Delete</button>
        </div>
      )}
    </div>
  )
}

export default AllProductsUI
