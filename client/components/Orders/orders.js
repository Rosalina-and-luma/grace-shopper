import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrdersFromServer} from '../../reducer/order/order'

class Orders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.user.id)
  }
  render() {
    console.log('Order Props', this.props)
    return (
      <div>
        <h1>Here are your orders</h1>
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
