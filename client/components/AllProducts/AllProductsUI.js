import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {
  addToCartServer,
  updateInventoryToServer,
  handleLocalStorage,
  getOrdersFromServer
} from '../../reducer/order/order'
import './AllProducts.css'

class AllProductsUI extends Component {
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
    if (Object.keys(this.props.currentOrder).length) {
      let product = this.props.currentOrder.order_products.filter(
        prod => prod.productId === data.productId
      )
      console.log('handleUserBuy product', product)
      if (product.length) {
        console.log('handleUserBuy 1')
        this.props.addToCart({
          productId: data.productId,
          quantity: product[0].quantity + 1,
          orderId: this.props.currentOrder.id
        })
      } else {
        console.log('handleUserBuy 2')
        this.props.addToCart({productId: data.productId, quantity: 1})
      }
    } else {
      console.log('handleUserBuy 3')
      this.props.addToCart({productId: data.productId, quantity: 1})
    }
    // let productExists = false
    // let cart = this.props.orders.filter( order => order.id === this.state.orderId)[0];

    // console.log('cart', cart)
    // let existingProduct = cart.products.filter( product => product.id === data.productId)[0]

    // console.log('existingProd', existingProduct)
    // if(existingProduct.length) {
    //     this.props.addToCart({
    //     orderId: this.state.orderId,
    //     productId: data.productId,
    //     quantity: existingProduct.products.order_product.quantity+1
    //   })
    // }

    // this.props.updateInventory({
    //   productId: data.productId,
    //   inventory: data.inventory - 1
    // })
    // console.log('productExists', productExists)

    // if(productExists) {
    //   this.props.addToCart({
    //     orderId: this.state.orderId,
    //     productId: data.productId,
    //     quantity: existingProduct.order_product.quantity+1
    //   })
    // } else {
    //   this.props.addToCart({productId: data.productId, quantity: 1})
    // }

    // this.props.updateInventory({
    //   productId: data.productId,
    //   inventory: data.inventory - 1
    // })

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
    updateInventory: data => dispatch(updateInventoryToServer(data)),
    getOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsUI)
