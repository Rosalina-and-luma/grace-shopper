import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {
  addToCartServer,
  updateInventoryToServer,
  handleLocalStorage
} from '../../reducer/order/order'
import './AllProducts.css'

const AllProductsUI = props => {
  const {product, isAdmin, user} = props

  const handleUserBuy = data => {
    props.addToCart({productId: data.productId, quantity: 1})
    props.updateInventory({
      productId: data.productId,
      inventory: data.inventory - 1
    })
  }

  console.log('in productUI', product)
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
      {product.inventory ? (
        Object.keys(user).length ? (
          <button
            type="button"
            onClick={() => {
              handleUserBuy({
                productId: props.product.id,
                quantity: 1,
                inventory: props.product.inventory
              })
            }}
          >
            Buy
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
            Buy
          </button>
        )
      ) : (
        <label>Out of stock</label>
      )}
      {/* {Object.keys(user).length ? (
        <button
          type="button"
          onClick={() => {
            handleUserBuy({
              productId: props.product.id,
              quantity: 1,
              inventory: props.product.inventory
            })
          }}
        >
          Buy
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
          Buy
        </button>
      )} */}
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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: order => dispatch(addToCartServer(order)),
    deleteProduct: id => dispatch(deleteFromServer(id)),
    updateInventory: data => dispatch(updateInventoryToServer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsUI)
