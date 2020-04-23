import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'

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
          <NavLink to="/products">
            <button
              type="button"
              onClick={() => {
                props.deleteProduct(product.id)
              }}
            >
              Delete
            </button>
          </NavLink>
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: id => dispatch(deleteFromServer(id))
  }
}
export default connect(null, mapDispatchToProps)(AllProductsUI)
