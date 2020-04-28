import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {
  addToCartServer,
  updateProductInventoryToServer,
  updateOrderQuantityToServer,
  handleLocalStorage,
  getOrdersFromServer
} from '../../reducer/order/order'
import './AllProducts.css'

const AllProductsUI = props => {
  const {
    product,
    isAdmin,
    user,
    updateInventory,
    updateQuantity,
    addToCart,
    currentOrder
  } = props

  const handleUserBuy = data => {
    if (Object.keys(currentOrder).length) {
      let currentProduct = currentOrder.order_products.filter(
        prod => prod.productId === data.productId
      )

      if (currentProduct.length) {
        currentProduct[0].quantity += 1
        currentProduct[0].inventory -= 1

        updateQuantity({
          productId: data.productId,
          quantity: currentProduct[0].quantity,
          orderId: currentOrder.id
        })
        updateInventory({
          productId: data.productId,
          inventory: currentProduct[0].inventory
        })
      } else {
        addToCart({productId: data.productId, quantity: 1})
        currentOrder.order_products.push({
          productId: data.productId,
          quantity: 1
        })
      }
    } else {
      addToCart({productId: data.productId, quantity: 1})
    }
    product.inventory -= 1
    updateInventory({
      productId: data.productId,
      inventory: data.inventory - 1
    })
  }

  return (
    <div className="products">
      <NavLink to={`/products/${product.id}`}>
        <img src={product.imgUrl} />
      </NavLink>

      <div className="item-info">
        <span className="name">{product.name}</span>
        <span className="price">${product.price}</span>
      </div>

      <div className="item-buy">
        {product.inventory ? (
          Object.keys(user).length ? (
            <button
              type="button"
              className="buy-button"
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
                  inventory: props.product.inventory,
                  quantity: 1
                })
              }}
            >
              {' '}
              Add To Cart
            </button>
          )
        ) : (
          <label>Out of stock</label>
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
    user: state.user,
    orders: state.order.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: order => dispatch(addToCartServer(order)),
    deleteProduct: id => dispatch(deleteFromServer(id)),
    updateInventory: data => dispatch(updateProductInventoryToServer(data)),
    updateQuantity: data => dispatch(updateOrderQuantityToServer(data)),
    getOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsUI)
