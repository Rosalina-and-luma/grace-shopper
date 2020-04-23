import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrdersFromServer} from '../../reducer/order/order'
import './orders.css'

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.user.id)
  }
  render() {
    console.log('Order Props', this.props)
    // let orders = (this.props.orders).map(order => {
    //   console.log('*****',order)
    // })

    return (
      <div>
        <h1>Here are your orders</h1>
        {this.props.orders.map(order => {
          console.log('PRODUCT', order)
          let products = []
          if (!order.purchased) {
            for (let i = 0; i < order.products.length; i++) {
              let p = order.products[i]
              let op = order.order_products[i]
              products.push({
                key: p.id,
                src: p.imgUrl,
                name: p.name,
                unitPrice: op.unitPrice,
                quantity: op.quantity
              })
            }
          }
          console.log('products array', products)
          return products.map(product => (
            <div key={product.id} className="orders-section">
              <img src={product.src} />
              <span className="name">{product.name}</span>
              <span className="unitPrice">{product.unitPrice}</span>
              <span className="quantity">{product.quantity}</span>
            </div>
          ))
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
    getOrders: userId => dispatch(getOrdersFromServer(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
