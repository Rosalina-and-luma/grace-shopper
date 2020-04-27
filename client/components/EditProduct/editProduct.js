import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {updateProductOnServer} from '../../reducer/allProds'

class EditProduct extends Component {
  constructor() {
    super()
    this.state = {
      id: 0,
      name: '',
      imgUrl: '',
      description: '',
      price: 0,
      categoryId: 0,
      inventory: 0,
      categoryName: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // if (!this.props.products.length) {
    //   console.log('calling...')
    //   this.props.getProducts()
    // }
    // console.log('products....', this.props.products)
    let selectedProduct = this.props.products.filter(product => {
      if (product.id === parseInt(this.props.match.params.productId)) {
        console.log('product', product)
        return product
      }
    })[0]

    if (selectedProduct) {
      this.setState({
        id: selectedProduct.id,
        name: selectedProduct.name,
        imgUrl: selectedProduct.imgUrl,
        description: selectedProduct.description,
        price: selectedProduct.price,
        categoryId: selectedProduct.categoryId,
        inventory: selectedProduct.inventory,
        categoryName: selectedProduct.category.name
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit() {
    event.preventDefault()
    const updatedProduct = this.state
    const {updateProduct} = this.props
    await updateProduct(updatedProduct)
    this.props.history.push('/products')
  }

  render() {
    return (
      <div className="edit-form">
        <h1>Edit Product</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
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
          <select
            defaultValue="default"
            onChange={this.handleChange}
            name="categoryId"
          >
            <option value="1">{categoryName}</option>
            <option value="2">Wands</option>
            <option value="3">Brooms</option>
            <option value="4">Robes</option>
            <option value="5">Misc</option>
          </select>
          <br />

          <label>Inventory</label>
          <input
            type="text"
            name="inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
          />
          <br />

          <button type="submit">Update Product</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.allProducts.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: product => dispatch(updateProductOnServer(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
