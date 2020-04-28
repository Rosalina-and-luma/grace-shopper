import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {
  addToCartServer,
  updateProductInventoryToServer,
  updateOrderQuantityToServer,
  handleLocalStorage,
  getOrdersFromServer
} from '../../reducer/order/order'
import './AllProducts.css'

class AllProductsUI extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }
  // componentDidMount = async () =>{
  //   console.log('component did mount in productUI')
  //   if (this.props.user.id) {
  //     await this.props.getOrders();
  //     this.props.orders.forEach(order => {
  //       if(!order.purchased) {
  //         this.setState({
  //           order: order
  //         })
  //       }
  //     })
  //     console.log('allproduct component did mount state order', this.state.order)
  //   }
  // }

  handleUserBuy = data => {
    console.log('handleUserBuy', this.props.currentOrder)
    console.log('handleUserBuy data', data)
    if (Object.keys(this.props.currentOrder).length) {
      console.log('updated product', this.props.currentOrder.order_products)
      let product = this.props.currentOrder.order_products.filter(
        // console.log('every prod', prod, prod.productId)
        prod => prod.productId === data.productId
      )
      console.log('handleUserBuy product', product)
      if (product.length) {
        console.log('handleUserBuy 1')
        // this.props.addToCart({
        //   productId: data.productId,
        //   quantity: product[0].quantity + 1,
        //   orderId: this.props.currentOrder.id
        // })

        product[0].quantity += 1
        product[0].inventory -= 1

        this.props.updateQuantity({
          productId: data.productId,
          quantity: product[0].quantity,
          orderId: this.props.currentOrder.id
        })
        this.props.updateInventory({
          productId: data.productId,
          inventory: product[0].inventory
        })
      } else {
        console.log('handleUserBuy 2')
        this.props.addToCart({productId: data.productId, quantity: 1})
        this.props.currentOrder.order_products.push({
          productId: data.productId,
          quantity: 1
        })
      }
    } else {
      console.log('handleUserBuy 3')
      this.props.addToCart({productId: data.productId, quantity: 1})
    }
    this.props.product.inventory -= 1
    this.props.updateInventory({
      productId: data.productId,
      inventory: data.inventory - 1
    })
  }

  render() {
    console.log('state in AllProductsUI', this.state)
    const {product, isAdmin, user} = this.props

    return (
      <div className="products">
        <NavLink to={`/products/${product.id}`}>
          <img src={product.imgUrl} />
        </NavLink>
        <span className="name">{product.name}</span>
        <span className="price">${product.price}</span>
        <NavLink to={`/products/${product.id}`}>
          <button type="button">View Details</button>
        </NavLink>
        {product.inventory ? (
          Object.keys(user).length ? (
            <button
              type="button"
              onClick={() => {
                this.handleUserBuy({
                  productId: this.props.product.id,
                  quantity: 1,
                  inventory: this.props.product.inventory
                })
              }}
            >
              Buy
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleLocalStorage({
                  productId: this.props.product.id,
                  name: this.props.product.name,
                  imgUrl: this.props.product.imgUrl,
                  description: this.props.product.description,
                  price: this.props.product.price,
                  inventory: this.props.product.inventory,
                  quantity: 1
                })
              }}
            >
              {' '}
              Buy
            </button>
          )
        ) : (
          <label>Out of stock</label>
        )}
        {/* {Object.keys(user).length ? (
          <button
            type="button"
            onClick={() => {
              handleUserBuy({
                productId: props.product.id,
                quantity: 1,
                inventory: props.product.inventory
              })
            }}
          >
            Buy
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleLocalStorage({
                productId: props.product.id,
                name: props.product.name,
                imgUrl: props.product.imgUrl,
                description: props.product.description,
                price: props.product.price,
                quantity: 1
              })
            }}
          >
            {' '}
            Buy
          </button>
        )} */}
        {isAdmin && (
          <div>
            <NavLink to={`/products/${product.id}/update`}>
              <button type="button">Edit</button>
            </NavLink>
            <NavLink to="/products">
              <button
                type="button"
                onClick={() => {
                  this.props.deleteProduct(product.id)
                }}
              >
                Delete
              </button>
            </NavLink>
          </div>
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
    addToCart: order => dispatch(addToCartServer(order)),
    deleteProduct: id => dispatch(deleteFromServer(id)),
    updateInventory: data => dispatch(updateProductInventoryToServer(data)),
    updateQuantity: data => dispatch(updateOrderQuantityToServer(data)),
    getOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsUI)
