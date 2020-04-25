import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {fetchSingleProduct} from '../../reducer/singleProduct'

class SingleProduct extends Component {
  componentDidMount() {
    console.log('id from URL', this.props.match.params.productId)
    this.props.getSelectedProduct(this.props.match.params.productId)
  }
  render() {
    const {isLoading, user, selectedProduct, deleteProduct} = this.props
    // console.log('State props', selectedProduct, isLoading)

    if (isLoading)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    // console.log('selected product', selectedProduct)

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
    isLoading: state.singleProduct.isLoading
  }
}

const mapDisptachToProps = dispatch => {
  return {
    getSelectedProduct: id => {
      dispatch(fetchSingleProduct(id))
    },
    deleteProduct: id => dispatch(deleteFromServer(id))
  }
}

export default connect(mapStateToProps, mapDisptachToProps)(SingleProduct)
