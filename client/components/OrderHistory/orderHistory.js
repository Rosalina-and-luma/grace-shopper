import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrdersFromServer} from '../../reducer/order/order'

class OrderHistory extends Component {
  componentDidMount = async () => {
    const {getOrders, orders} = this.props
    await getOrders()
    let products = {allProducts: [], total: 0}

    orders.map(order => {
      let orderItem = {orderId: order.id}
      let prodDetails = []
      order.products.map(product => {
        prodDetails = []
        prodDetails.push({
          id: product.id,
          imgUrl: product.imgUrl,
          name: product.name,
          unitPrice: product.unitPrice,
          quantity: product.unitPrice,
          subTotal: product.subTotal
        })
      })
      orderItem.allProducts = prodDetails
      orderItem.total = order.total
      products.push(orderItem)
    })
    // this.props.orders.map((order) => {
    //   if (order.purchased) {
    //     for (let i = 0; i < order.products.length; i++) {
    //       let prod = order.products[i]
    //       products.allProducts.push({
    //         orderId: order.id,
    //         id: prod.id,
    //         imgUrl: prod.imgUrl,
    //         name: prod.name,
    //         unitPrice: prod.order_product.unitPrice,
    //         quantity: prod.order_product.quantity,
    //         subTotal: prod.order_product.subTotal,
    //       })
    //     }
    //     products.total = order.total
    //   }
    // })

    console.log('order history', products)
    // this.setState({
    //   allProducts: products.allProducts.map((prod) => ({
    //     orderId: prod.orderId,
    //     id: prod.id,
    //     imgUrl: prod.imgUrl,
    //     name: prod.name,
    //     unitPrice: prod.unitPrice,
    //     quantity: prod.quantity,
    //     subTotal: prod.subTotal,
    //   })),
    //   total: products.total,
    // })
    // }
    // }
  }

  render() {
    return (
      <div>
        <h1> Here is your order history </h1>
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
