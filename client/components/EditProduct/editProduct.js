import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchProductsFromServer,
  updateProductOnServer
} from '../../reducer/allProds'

class EditProduct extends Component {
  constructor() {
    super()
    this.state = {
      id: 0,
      name: '',
      imgUrl: '',
      description: '',
      price: 0,
      category: '',
      inventory: 0
    }
  }
  componentDidMount() {
    // if (!this.props.products.length) {
    //   console.log('calling...')
    //   this.props.getProducts()
    // }
    console.log('products....', this.props.products)
    let selectedProduct = this.props.products.filter(product => {
      if (product.id === parseInt(this.props.match.params.productId)) {
        return product
      }
    })[0]

    console.log('selected product', selectedProduct)

    if (selectedProduct) {
      this.setState({
        id: selectedProduct.id,
        name: selectedProduct.name,
        imgUrl: selectedProduct.imgUrl,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category: selectedProduct.category,
        inventory: selectedProduct.inventory
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="edit-form">
        <h1>Product will be edited here</h1>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br />

        <label>ImageURL</label>
        <input
          type="text"
          name="imageUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        <br />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />

        <label>Price</label>
        <input
          type="text"
          name="price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <br />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={this.state.category}
          onChange={this.handleChange}
        />
        <br />

        <label>Inventory</label>
        <input
          type="text"
          name="inventory"
          value={this.state.inventory}
          onChange={this.handleChange}
        />
        <br />

        <button
          type="button"
          onClick={() => {
            this.props.updateProduct({
              id: this.state.id,
              name: this.state.name,
              imgUrl: this.state.imgUrl,
              description: this.state.description,
              price: this.state.price,
              category: this.state.category,
              inventory: this.state.inventory
            })
          }}
        >
          {' '}
          Update Product{' '}
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.allProducts.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // getProducts: () => dispatch(fetchProductsFromServer())
    updateProduct: product => dispatch(updateProductOnServer(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
