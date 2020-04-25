import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToCartServer} from '../../reducer/order/order'

const AllProductsUI = props => {
  const {product} = props

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
        let updatedOrder = [...updatedExisitngOrder]
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
      {Object.keys(props.user).length ? (
        <button
          type="button"
          onClick={() => {
            props.addToCart({
              userId: props.user.id,
              productId: props.product.id,
              quantity: 1
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
    addToCart: order => dispatch(addToCartServer(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsUI)
