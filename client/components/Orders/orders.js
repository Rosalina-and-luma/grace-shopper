import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getOrdersFromServer,
  addToCartServer,
  deleteProdFromOrderServer
} from '../../reducer/order/order'
import GuestOrder from '../GuestOrder/guestOrder'
import './orders.css'
import {NavLink} from 'react-router-dom'

class Orders extends Component {
  constructor() {
    super()
    this.state = {
      allProducts: [],
      total: 0
    }
  }
  componentDidMount = async () => {
    if (this.props.user.id) {
      await this.props.getOrders(this.props.user.id)
      let products = {allProducts: [], total: 0}

      this.props.orders.map(order => {
        if (!order.purchased) {
          for (let i = 0; i < order.products.length; i++) {
            let prod = order.products[i]
            // let orderProd = order.order_products[i]
            products.allProducts.push({
              orderId: order.id,
              id: prod.id,
              imgUrl: prod.imgUrl,
              name: prod.name,
              unitPrice: prod.order_product.unitPrice,
              quantity: prod.order_product.quantity,
              subTotal: prod.order_product.subTotal
            })
          }
          products.total = order.total
        }
      })

      this.setState({
        allProducts: products.allProducts.map(prod => ({
          orderId: prod.orderId,
          id: prod.id,
          imgUrl: prod.imgUrl,
          name: prod.name,
          unitPrice: prod.unitPrice,
          quantity: prod.quantity,
          subTotal: prod.subTotal
        })),
        total: products.total
      })
    }
  }

  addQuantity = id => {
    let updatedQuantity
    let oldProds = [...this.state.allProducts]
    let newProds = oldProds.map(prod => {
      if (prod.id === id) {
        prod.quantity += 1
        updatedQuantity = prod.quantity
        prod.subTotal = prod.quantity * prod.unitPrice
      }
      return prod
    })

    this.setState({
      allProducts: [...newProds],
      total: newProds.reduce((sum, prod) => {
        sum += prod.subTotal
        return sum
      }, 0)
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
      if (prod.id === id && prod.quantity > 0) {
        prod.quantity -= 1
        updatedQuantity = prod.quantity
        prod.subTotal = prod.quantity * prod.unitPrice
      }
      return prod
    })

    newProds.forEach((prod, index) => {
      if (prod.quantity === 0) {
        this.props.deleteProdFromOrder({
          orderId: prod.orderId,
          productId: prod.id
        })
        newProds.splice(index, 1)
      }
    })

    this.setState({
      allProducts: [...newProds],
      total: newProds.reduce((sum, prod) => {
        sum += prod.subTotal
        return sum
      }, 0)
    })

    if (updatedQuantity !== 0) {
      this.props.updateOrders({
        userId: this.props.user.id,
        productId: id,
        quantity: updatedQuantity
      })
    }
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
        {this.state.allProducts.length ? (
          this.state.allProducts.map(product => {
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
                <span>{product.subTotal}</span>
              </div>
            )
          })
        ) : (
          <GuestOrder />
        )}
        <span>Total: {this.state.total}</span>
        <NavLink to="/checkout">
          <button type="button"> Checkout </button>
        </NavLink>
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
