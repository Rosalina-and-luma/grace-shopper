import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchSingleProduct} from '../../reducer/singleProduct'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.productId)
  }
  render() {
    const {isLoading} = this.props
    const selectedProduct = this.props.selectedProduct[0]
    console.log('State props', selectedProduct, isLoading)
    if (isLoading)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    console.log('selected product', selectedProduct)
    return (
      <div>
        <h1>Single Product</h1>
        {isLoading && <div>Data Loading...</div>}
        {selectedProduct && (
          <div>
            <img src={selectedProduct.imgUrl} height="50px" />
            <p>{selectedProduct.name}</p>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.price}</p>
            <button type="button">Buy</button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.singleProduct.selectedProduct,
    isLoading: state.singleProduct.isLoading
  }
}

const mapDisptachToProps = dispatch => {
  return {
    getSelectedProduct: id => {
      dispatch(fetchSingleProduct(id))
    }
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(SingleProduct)
