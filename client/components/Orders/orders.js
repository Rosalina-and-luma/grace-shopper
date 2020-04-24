import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getOrdersFromServer,
  addToCartServer,
  deleteProdFromOrderServer
} from '../../reducer/order/order'
import './orders.css'

class Orders extends Component {
  constructor() {
    super()
    this.state = {
      allProducts: []
    }
  }
  componentDidMount = async () => {
    await this.props.getOrders(this.props.user.id)
    let products = []
    this.props.orders.map(order => {
      if (!order.purchased) {
        console.log('order id', order.id)
        for (let i = 0; i < order.products.length; i++) {
          let prod = order.products[i]
          let orderProd = order.order_products[i]
          products.push({
            orderId: order.id,
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
        orderId: prod.orderId,
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

  onDelete = data => {
    this.props.deleteProdFromOrder(data)

    const oldProducts = [...this.state.allProducts]
    const newProducts = oldProducts.filter(prod => prod.id !== data.productId)
    this.setState({
      allProducts: [...newProducts]
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
                onClick={() => {
                  this.onDelete({
                    orderId: product.orderId,
                    productId: product.id
                  })
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
    updateOrders: order => dispatch(addToCartServer(order)),
    deleteProdFromOrder: data => {
      dispatch(deleteProdFromOrderServer(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
