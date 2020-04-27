import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {
  addToCartServer,
  updateInventoryToServer
} from '../../reducer/order/order'
import './AllProducts.css'

const AllProductsUI = props => {
  const {product, isAdmin, user} = props

  const handleLocalStorage = data => {
    let updateExistingFlag = false
    let newOrder = {
      id: data.productId,
      name: data.name,
      imgUrl: data.imgUrl,
      quantity: data.quantity,
      description: data.description,
      price: data.price,
      subTotal: data.price * data.quantity
    }
    //checking if products already exists in localStorage
    if (
      localStorage.getItem('products') &&
      localStorage.getItem('products').length
    ) {
      let currentOrders = JSON.parse(localStorage.getItem('products'))

      //checking if the product user is trying to buy is already in storage, if it is already there, increase the quantity by 1
      let updatedExisitngOrder = currentOrders.map(order => {
        if (order.id === data.productId) {
          order.quantity += 1
          order.subTotal = order.quantity * order.price
          updateExistingFlag = true
        }
        return order
      })
      if (updateExistingFlag) {
        localStorage.setItem(
          'products',
          JSON.stringify([...updatedExisitngOrder])
        )
      } else {
        let result = [...currentOrders, newOrder]
        localStorage.setItem('products', JSON.stringify(result))
      }
    } else {
      localStorage.setItem('products', JSON.stringify([newOrder]))
    }

    console.log('local cart', JSON.parse(localStorage.getItem('products')))
  }

  const handleUserBuy = data => {
    props.addToCart({productId: data.productId, quantity: 1})
    props.updateInventory({
      productId: data.productId,
      inventory: data.inventory - 1
    })
  }

  return (
    <div className="products">
      <NavLink to={`/products/${product.id}`}>
        <img src={product.imgUrl} />
      </NavLink>
      <span className="name">{product.name}</span>
      <span className="price">{product.price}</span>
      <NavLink to={`/products/${product.id}`}>
        <button type="button">View Details</button>
      </NavLink>
      {Object.keys(user).length ? (
        <button
          type="button"
          // onClick={() => {
          //   props.addToCart({
          //     // userId: props.user.id,
          //     productId: props.product.id,
          //     quantity: 1,
          //   })
          // }}
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
      )}
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
