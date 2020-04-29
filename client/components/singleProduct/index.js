import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {fetchSingleProduct} from '../../reducer/singleProduct'
import {
  handleLocalStorage,
  getOrdersFromServer,
  addToCartServer,
  updateProductInventoryToServer,
  updateOrderQuantityToServer
} from '../../reducer/order/order'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.productId)
    this.props.getOrders()
  }

  handleUserBuy = data => {
    const {selectedProduct, orders} = this.props
    console.log('data', data)
    console.log()
    if (data.inventory < 1) return

    let currentOrder = {}
    orders.forEach(order => {
      if (order.purchased === false) {
        currentOrder = order
      }
    })

    if (Object.keys(currentOrder).length) {
      let product = currentOrder.order_products.filter(
        prod => prod.productId === data.productId
      )
      if (product.length) {
        product[0].quantity += 1

        this.props.updateQuantity({
          productId: data.productId,
          quantity: product[0].quantity,
          orderId: currentOrder.id
        })
      } else {
        this.props.addToCart({productId: data.productId, quantity: 1})
        currentOrder.order_products.push({
          productId: data.productId,
          quantity: 1
        })
      }
    } else {
      this.props.addToCart({productId: data.productId, quantity: 1})
    }
    selectedProduct.inventory = data.inventory - 1
    this.props.updateInventory({
      productId: data.productId,
      inventory: data.inventory - 1
    })
  }

  render() {
    const {isLoading, user, selectedProduct, deleteProduct} = this.props

    if (isLoading)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )

    return (
      <div>
        <h1>Single Product</h1>
        {isLoading && <div>Data Loading...</div>}
        {selectedProduct && (
          <div className="single-item-conatiner">
            <div>
              <img src={selectedProduct.imgUrl} height="350px" />
            </div>
            <p>{selectedProduct.name}</p>
            <p>{selectedProduct.description}</p>
            <p>${selectedProduct.price}</p>
            {selectedProduct.inventory ? (
              Object.keys(user).length ? (
                <button
                  type="button"
                  onClick={() => {
                    this.handleUserBuy({
                      productId: selectedProduct.id,
                      quantity: 1,
                      inventory: selectedProduct.inventory
                    })
                  }}
                >
                  Buy
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleLocalStorage({
                      productId: selectedProduct.id,
                      name: selectedProduct.name,
                      imgUrl: selectedProduct.imgUrl,
                      description: selectedProduct.description,
                      price: selectedProduct.price,
                      inventory: selectedProduct.inventory,
                      quantity: 1
                    })
                  }
                >
                  Buy
                </button>
              )
            ) : (
              <label>Out of stock</label>
            )}

            {user.isAdmin && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    this.props.history.push(
                      `/products/${selectedProduct.id}/update`
                    )
                  }}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    deleteProduct(selectedProduct.id)
                    this.props.history.push('/products')
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    selectedProduct: state.singleProduct.selectedProduct,
    orders: state.order.allOrders,
    isLoading: state.singleProduct.isLoading
  }
}

const mapDisptachToProps = dispatch => {
  return {
    getSelectedProduct: id => {
      dispatch(fetchSingleProduct(id))
    },
    deleteProduct: id => dispatch(deleteFromServer(id)),
    getOrders: () => dispatch(getOrdersFromServer()),
    addToCart: order => dispatch(addToCartServer(order)),
    updateInventory: data => dispatch(updateProductInventoryToServer(data)),
    updateQuantity: data => dispatch(updateOrderQuantityToServer(data))
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(SingleProduct)
