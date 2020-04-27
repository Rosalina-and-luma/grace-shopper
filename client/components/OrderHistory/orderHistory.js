import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrdersFromServer} from '../../reducer/order/order'
import './orderHistory.css'

class OrderHistory extends Component {
  componentDidMount = async () => {
    const {getOrders} = this.props
    await getOrders()
  }

  render() {
    return (
      <div>
        <h1> Here is your order history </h1>
        {this.props.orders.map(order => {
          if (order.purchased) {
            return (
              <div className="order-section">
                Orders
                {order.products.map(product => {
                  return (
                    <div key={product.id} className="product">
                      <img src={product.imgUrl} />
                      <div className="product-details">
                        <span>{product.name}</span>
                        <span>${product.order_product.unitPrice}</span>
                        <span>Quantity: {product.order_product.quantity}</span>
                        <span>SubTotal: {product.order_product.subTotal}</span>
                      </div>
                    </div>
                  )
                })}
                <span>Total: {order.total}</span>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
