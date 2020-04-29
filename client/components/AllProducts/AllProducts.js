import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsFromServer} from '../../reducer/allProds'
import AllProductsUI from './AllProductsUI'
import './AllProducts.css'
import {getOrdersFromServer} from '../../reducer/order/order'
const queryString = require('query-string')

class AllProducts extends React.Component {
  componentDidMount() {
    const {getProducts, getOrders} = this.props
    getProducts()
    getOrders()
  }

  render() {
    const {products, orders, isLoading, user, location} = this.props

    let currentOrder = {}
    orders.forEach(order => {
      if (order.purchased === false) {
        currentOrder = order
      }
    })

    const query = queryString.parse(location.search)
    const category = query ? query.category : ''
    const allProds = category
      ? products.filter(product => product.category.name === category)
      : products

    if (isLoading) return <h1>loading....</h1>

    return (
      <div className="products-landing-page">
        <div>
          <h1>Hello {user.id ? user.firstName + '!' : 'guest!'} </h1>
          <h1>
            {category
              ? category[0].toUpperCase() + category.slice(1)
              : 'All Products'}
          </h1>

          {user.isAdmin ? (
            <div className="products_nav">
              <button
                className="add-product-button"
                type="button"
                onClick={() => this.props.history.push('/products/add')}
              >
                Add Product
              </button>
            </div>
          ) : (
            <div />
          )}

          <div className="products-section">
            {allProds.map(product => {
              return (
                <div key={product.id}>
                  <AllProductsUI
                    product={product}
                    currentOrder={currentOrder}
                    isAdmin={user.isAdmin}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts.products,
    orders: state.order.allOrders,
    isLoading: state.allProducts.isLoading,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: category => dispatch(fetchProductsFromServer(category)),
    getOrders: () => dispatch(getOrdersFromServer())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
