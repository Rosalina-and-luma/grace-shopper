import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deleteFromServer} from '../../reducer/allProds'
import {fetchSingleProduct} from '../../reducer/singleProduct'
import './singleProduct.css'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getSelectedProduct(this.props.match.params.productId)
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
        {isLoading && <div>Data Loading...</div>}
        {selectedProduct && (
          <div className="single-item-conatiner">
            <div>
              <img src={selectedProduct.imgUrl} height="350px" />
            </div>

            <div className="product-info">
              <p className="product-name">{selectedProduct.name}</p>
              <p className="product-description">
                {selectedProduct.description}
              </p>
              <p>${selectedProduct.price}</p>
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
