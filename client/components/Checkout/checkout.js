import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getOrdersFromServer,
  updateOrderToServer
} from '../../reducer/order/order'

class Checkout extends Component {
  componentDidMount = async () => {
    const {getOrders, updateOrders, orders, user} = this.props
    await getOrders(user.id)
    orders.forEach(order => {
      if (!order.purchased) {
        updateOrders(order.id)
      }
    })
  }

  render() {
    return (
      <div>
        <span>
          Thank you for being valuable customers! Your order has been recieved!
        </span>
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
