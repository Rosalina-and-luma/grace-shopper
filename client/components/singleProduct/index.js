import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../../reducer/singleProduct'

// const SingleProduct = (props) => {
//   console.log('PROPS', props)

//   //componentdidMount
//   const product = props.selectedProduct
//   console.log('product', product)
//   return (
//     <div>
//       {}
//       <h1>Single Product</h1>
//       {product && (
//         <span>{product.name}</span>
//       )}
//     </div>
//   )
// }

// const mapStateToProps = (state) => {
//   console.log('state', state)
//   if(state.singleProduct) {
//     return {
//       selectedProduct: state.singleProduct.singleProduct,
//       isLoading: state.singleProduct.isLoading
//     }
//   } else {
//     return {}
//   }
// }

//mapDisptachToProps

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.productId)
  }
  render() {
    const {selectedProduct, isLoading} = this.props
    console.log('State props', selectedProduct, isLoading)
    return (
      <div>
        <h1>Single Product</h1>
        {isLoading && <div>Data Loading...</div>}
        {selectedProduct && (
          <div>
            <span>{selectedProduct.name}</span>
            <span>{selectedProduct.description}</span>
            <span>{selectedProduct.price}</span>
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
