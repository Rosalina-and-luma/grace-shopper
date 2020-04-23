import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsFromServer} from '../../reducer/allProds'
import AllProductsUI from './AllProductsUI'
import './AllProducts.css'

class AllProducts extends React.Component {
  componentDidMount() {
    const {getProducts} = this.props
    getProducts()
  }

  render() {
    console.log('props: ', this.props)
    const {products, isLoading, user} = this.props

    if (isLoading) return <h1>loading....</h1>

    return (
      <div className="products-landing-page">
        <div>
          <p>hello {user.id ? user.firstName + '!' : 'guest!'} </p>
          <h1>All Products</h1>

          <div className="products-section">
            {products.map(product => {
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
