import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import './AllProducts.css'

const AllProductsUI = props => {
  const {product, isAdmin} = props
  return (
    <div className="products">
      <NavLink to={`/products/${product.id}`}>
        <img src={product.imgUrl} />
      </NavLink>
      <span className="name">{product.name}</span>
      <span className="price">${product.price}</span>
      <NavLink to={`/products/${product.id}`}>
        <button type="button">View Details</button>
      </NavLink>
      <button type="button">Buy</button>
      {isAdmin && (
        <div>
          <NavLink to={`/products/${product.id}/update`}>
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
