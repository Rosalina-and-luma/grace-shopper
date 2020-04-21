import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsFromServer} from '../../reducer/allProds'

class AllProducts extends React.Component {
  componentDidMount() {
    const {getProducts} = this.props
    getProducts()
  }

  render() {
    const {products} = this.props
    console.log(products)

    return (
      <div>
        <h1>All Products</h1>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProductsFromServer())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
