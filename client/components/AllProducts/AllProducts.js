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
    const {products, isLoading} = this.props
    const isAdmin = true

    if (isLoading) return <h1>loading....</h1>

    return (
      <div className="products-landing-page">
        <h1>All Products</h1>

        <div className="products-section">
          {products.map(product => {
            return (
              <div key={product.id}>
                <AllProductsUI product={product} isAdmin={isAdmin} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts.products,
    isLoading: state.allProducts.isLoading
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProductsFromServer())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
