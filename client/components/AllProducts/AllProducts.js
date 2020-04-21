import React from 'react'
import {connect} from 'react-redux'
import {fetchProductsFromServer} from '../../reducer/allProds'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    const {getProducts} = this.props
    getProducts()
  }

  render() {
    const {products, isLoading} = this.props

    if (isLoading) return <h1>loading....</h1>

    return (
      <div>
        <h1>All Products</h1>
        {products.map(product => {
          return (
            <div key={product.id}>
              <img src={product.imgUrl} height="50px" />
              <Link to={`products/${product.id}`}>
                <p>{product.name}</p>
              </Link>
              <p>{product.price}</p>
              <button type="button">Buy</button>
            </div>
          )
        })}
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
