import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {addToCartServer, handleLocalStorage} from '../../reducer/order/order'
import './AllProducts.css'

const AllProductsUI = props => {
  const {product, isAdmin, user} = props

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

      {/*

      </div> */}

      {/* {isAdmin && (
        <div>
          <NavLink to={`/products/${product.id}/update`}>
            <button type="button" className="edit-button">
              Edit
            </button>
      <span className="name">{product.name}</span>
      <span className="price">${product.price}</span>
      <NavLink to={`/products/${product.id}`}>
        <button type="button">View Details</button>
      </NavLink> */}

      <div className="item-buy">
        {Object.keys(user).length ? (
          <button
            type="button"
            className="buy-button"
            onClick={() => {
              props.addToCart({
                // userId: props.user.id,
                productId: props.product.id,
                quantity: 1
              })
            }}
          >
            Add to Cart
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleLocalStorage({
                productId: props.product.id,
                name: props.product.name,
                imgUrl: props.product.imgUrl,
                description: props.product.description,
                price: props.product.price,
                quantity: 1
              })
            }}
          >
            {' '}
            Add To Cart
          </button>
        )}
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: order => dispatch(addToCartServer(order)),
    deleteProduct: id => dispatch(deleteFromServer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsUI)
