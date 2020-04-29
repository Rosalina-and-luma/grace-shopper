import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getOrdersFromServer,
  updateOrderToServer
} from '../../reducer/order/order'
import './checkout.css'

class Checkout extends Component {
  componentDidMount = async () => {
    if (this.props.user.id) {
      const {getOrders, updateOrders, orders, user} = this.props
      await getOrders(user.id)
      orders.forEach(order => {
        if (!order.purchased) {
          updateOrders(order.id)
        }
      })
    }
  }

  render() {
    return (
      <div>
        <div classaNme="checkout">
          <span className="blurb">
            Thank you for being a valuable customer! Your order has been
            recieved!
          </span>
        </div>
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
    updateOrders: id => dispatch(updateOrderToServer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
