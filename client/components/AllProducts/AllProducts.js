import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsFromServer} from '../../reducer/allProds'
import AllProductsUI from './AllProductsUI'
import './AllProducts.css'
const queryString = require('query-string')

class AllProducts extends React.Component {
  componentDidMount() {
    const {getProducts} = this.props
    getProducts()
  }

  render() {
    const {products, isLoading, user, location} = this.props
    const query = queryString.parse(location.search)
    const category = query ? query.category : ''
    const allProds = category
      ? products.filter(product => product.category.name === category)
      : products

    console.log('products to render: ', allProds)

    if (isLoading) return <h1>loading....</h1>

    console.log('Logged in user id', user.id)

    return (
      <div className="products-landing-page">
        <div>
          <p>hello {user.id ? user.firstName + '!' : 'guest!'} </p>
          <h1>
            {category
              ? category[0].toUpperCase() + category.slice(1)
              : 'All Products'}
          </h1>

          {user.isAdmin ? (
            <div className="products_nav">
              <button
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
                  <AllProductsUI product={product} isAdmin={user.isAdmin} />
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
    isLoading: state.allProducts.isLoading,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: category => dispatch(fetchProductsFromServer(category))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
