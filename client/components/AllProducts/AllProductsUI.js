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

      <div className="item-info">
        <span className="name">{product.name}</span>
        <span className="price">${product.price}</span>
      </div>

      {/* <NavLink to={`/products/${product.id}`}>
        <button type="button">View Details</button>
      </NavLink> */}

      <div className="item-buy">
        <button type="button" className="buy-button">
          Add to Cart
        </button>
      </div>

      {isAdmin && (
        <div>
          <NavLink to={`/products/${product.id}/update`}>
            <button type="button" className="edit-button">
              Edit
            </button>
          </NavLink>
          <NavLink to="/products">
            <button
              type="button"
              className="delete-button"
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
