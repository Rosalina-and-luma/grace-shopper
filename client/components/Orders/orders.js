import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getOrdersFromServer,
  addToCartServer,
  deleteProdFromOrderServer,
  updateProductInventoryToServer,
  updateOrderQuantityToServer
} from '../../reducer/order/order'
import GuestOrder from '../GuestOrder/guestOrder'
import OrdersUI from './ordersUI'
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
    // if (this.props.user.id) {
    await this.props.getOrders()
    console.log('ORDERS', this.props.orders)
    let products = {allProducts: [], total: 0}
    if (this.props.orders && this.props.orders.length) {
      this.props.orders.map(order => {
        if (!order.purchased) {
          for (let i = 0; i < order.products.length; i++) {
            let prod = order.products[i]
            products.allProducts.push({
              orderId: order.id,
              id: prod.id,
              imgUrl: prod.imgUrl,
              name: prod.name,
              inventory: prod.inventory,
              unitPrice: prod.order_product.unitPrice,
              quantity: prod.order_product.quantity,
              subTotal: prod.order_product.subTotal
            })
          }
          products.total = order.total
        }
      })
    }

    this.setState({
      allProducts: products.allProducts.map(prod => ({
        orderId: prod.orderId,
        id: prod.id,
        imgUrl: prod.imgUrl,
        name: prod.name,
        inventory: prod.inventory,
        unitPrice: prod.unitPrice,
        quantity: prod.quantity,
        subTotal: prod.subTotal
      })),
      total: products.total
    })
    // }
  }

  addQuantity = data => {
    console.log('data in addQuantity', data)
    let updatedQuantity
    let updatedInventory
    let oldProds = [...this.state.allProducts]
    let newProds = []
    oldProds.forEach(prod => {
      console.log('......prods.....', prod)
      if (prod.id === data.productId) {
        if (prod.inventory > 0) {
          prod.quantity += 1
          updatedQuantity = prod.quantity
          prod.inventory -= 1
          updatedInventory = prod.inventory
          prod.subTotal = prod.quantity * prod.unitPrice
          newProds.push(prod)
        } else {
          alert(`There is no more inventory for ${prod.name}!`)
          newProds.push(prod)
        }
      } else {
        newProds.push(prod)
      }
    })

    // newProds.forEach( (prod, index) => {
    //   if(prod.inventory <= 0) {
    //     // newProds.splice(index, 1)
    //     alert(`You just bought the last of ${prod.name}, there are no more left!`)
    //   }
    // })

    // newProds.forEach((prod, index) => {
    //   if (prod.quantity === 0) {
    //     this.props.deleteProdFromOrder({
    //       orderId: prod.orderId,
    //       productId: prod.id
    //     })
    //     newProds.splice(index, 1)
    //   }
    // })

    console.log('newProds', newProds)
    this.setState({
      allProducts: [...newProds],
      total: newProds.reduce((sum, prod) => {
        console.log('^^^^^^^^', sum, prod)
        sum += prod.subTotal
        return sum
      }, 0)
    })

    if (updatedInventory >= 0) {
      this.props.updateQuantity({
        orderId: data.orderId,
        productId: data.productId,
        quantity: updatedQuantity
      })

      this.props.updateInventory({
        productId: data.productId,
        inventory: updatedInventory
      })
    }
    // this.props.updateOrders({
    //   orderId: data.orderId,
    //   productId: data.productId,
    //   quantity: updatedQuantity,
    //   inventory: updatedInventory
    // })
  }

  subtractQuantity = data => {
    let updatedQuantity
    let updatedInventory
    let oldProds = [...this.state.allProducts]
    let newProds = oldProds.map(prod => {
      if (prod.id === data.productId && prod.quantity > 0) {
        console.log('subtracting quantity')
        prod.quantity -= 1
        updatedQuantity = prod.quantity
        prod.inventory += 1
        updatedInventory = prod.inventory
        prod.subTotal = prod.quantity * prod.unitPrice
        console.log('updated prod data', prod)
      }
      return prod
    })

    newProds.forEach((prod, index) => {
      if (prod.quantity === 0) {
        // this.props.updateOrders({
        //   orderId: data.orderId,
        //   productId: data.productId,
        //   quantity: updatedQuantity,
        //   inventory: updatedInventory
        // })

        this.props.updateInventory({
          orderId: data.orderId,
          inventory: updatedInventory
        })

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
      this.props.updateQuantity({
        orderId: data.orderId,
        productId: data.productId,
        quantity: updatedQuantity
      })

      this.props.updateInventory({
        productId: data.productId,
        inventory: updatedInventory
      })
      // this.props.updateOrders({
      //   orderId: data.orderId,
      //   productId: data.productId,
      //   quantity: updatedQuantity,
      //   inventory: updatedInventory
      // })
    }
  }

  onDelete = data => {
    this.props.deleteProdFromOrder(data)
    let total = this.state.total

    const oldProducts = [...this.state.allProducts]

    const newProducts = oldProducts.filter(prod => {
      if (prod.id === data.productId) {
        total -= prod.subTotal
        console.log('before delete updating inventory', prod)
        // this.props.updateOrders({
        //   orderId: data.orderId,
        //   productId: data.productId,
        //   quantity: prod.quantity,
        //   inventory: prod.inventory + prod.quantity
        // })
        this.props.updateInventory({
          productId: data.productId,
          inventory: prod.inventory + prod.quantity
        })
      } else {
        return prod
      }
    })

    this.setState({
      allProducts: [...newProducts],
      total: total
    })
  }

  render() {
    console.log('orders state', this.state)
    return (
      <div>
        <span>Hello {this.props.user.firstName}!!</span>
        {console.log('user in render', this.props.user)}
        {this.state.total > 0 && this.props.user.id ? (
          <h1>Here are your orders</h1>
        ) : (
          this.props.user.id && <h1>Your cart is empty!</h1>
        )}
        {this.props.user.id ? (
          <div>
            {this.state.allProducts.map(product => {
              return (
                <div key={product.id} className="orders-section">
                  <OrdersUI
                    product={product}
                    addQuantity={this.addQuantity}
                    subtractQuantity={this.subtractQuantity}
                    onDelete={this.onDelete}
                  />
                </div>
              )
            })}

            {this.state.total > 0 && (
              <div>
                <span>Total: {this.state.total}</span>
                <br />
                <NavLink to="/checkout">
                  <button type="button"> Checkout </button>
                </NavLink>
              </div>
            )}
          </div>
        ) : (
          <GuestOrder />
        )}
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
    getOrders: () => dispatch(getOrdersFromServer()),
    updateOrders: order => dispatch(addToCartServer(order)),
    deleteProdFromOrder: data => {
      dispatch(deleteProdFromOrderServer(data))
    },
    updateInventory: data => dispatch(updateProductInventoryToServer(data)),
    updateQuantity: data => dispatch(updateOrderQuantityToServer(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
