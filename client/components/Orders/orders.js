import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrdersFromServer, addToCartServer} from '../../reducer/order/order'
import './orders.css'

class Orders extends Component {
  constructor() {
    super()
    this.state = {
      allProducts: []
    }
    this.removeItem = this.removeItem.bind(this)
  }
  componentDidMount = async () => {
    await this.props.getOrders(this.props.user.id)
    let products = []
    this.props.orders.map(order => {
      if (!order.purchased) {
        for (let i = 0; i < order.products.length; i++) {
          let prod = order.products[i]
          let orderProd = order.order_products[i]
          products.push({
            id: prod.id,
            imgUrl: prod.imgUrl,
            name: prod.name,
            unitPrice: orderProd.unitPrice,
            quantity: orderProd.quantity
          })
        }
      }
    })

    this.setState({
      allProducts: products.map(prod => ({
        id: prod.id,
        imgUrl: prod.imgUrl,
        name: prod.name,
        unitPrice: prod.unitPrice,
        quantity: prod.quantity
      }))
    })
  }

  addQuantity = id => {
    console.log('id', id)
    let updatedQuantity
    let oldProds = [...this.state.allProducts]
    let newProds = oldProds.map(prod => {
      if (prod.id === id) {
        prod.quantity += 1
        updatedQuantity = prod.quantity
      }
      return prod
    })
    this.setState({
      allProducts: [...newProds]
    })
    this.props.updateOrders({
      userId: this.props.user.id,
      productId: id,
      quantity: updatedQuantity
    })
  }

  subtractQuantity = id => {
    let updatedQuantity
    let oldProds = [...this.state.allProducts]
    let newProds = oldProds.map(prod => {
      if (prod.id === id) {
        prod.quantity -= 1
        updatedQuantity = prod.quantity
      }
      return prod
    })
    this.setState({
      allProducts: [...newProds]
    })
    this.props.updateOrders({
      userId: this.props.user.id,
      productId: id,
      quantity: updatedQuantity
    })
  }

  removeItem = itemId => {
    let newProds = this.state.allProducts.filter(
      product => itemId !== product.id
    )
    this.setState({
      allProducts: [...newProds]
    })
  }

  render() {
    return (
      <div>
        <h1>Here are your orders</h1>
        {this.state.allProducts.map(product => {
          return (
            <div key={product.id} className="orders-section">
              <img src={product.imgUrl} />
              <span className="name">{product.name}</span>
              <span className="unitPrice">{product.unitPrice}</span>
              <span className="quantity">{product.quantity}</span>
              <button
                type="button"
                onClick={() => {
                  this.addQuantity(product.id)
                }}
              >
                +
              </button>
              <label className="quantity" name="quantity">
                {product.quantity}
              </label>
              <button
                type="button"
                onClick={() => {
                  this.subtractQuantity(product.id)
                }}
              >
                -
              </button>
              <button
                type="button"
                className="remove"
                onClick={() => {
                  this.removeItem(product.id)
                }}
              >
                Remove
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.order.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: userId => dispatch(getOrdersFromServer(userId)),
    updateOrders: order => dispatch(addToCartServer(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
