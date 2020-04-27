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
      categoryId: null,
      inventory: 0
    }
  }
  componentDidMount() {
    // if (!this.props.products.length) {
    //   console.log('calling...')
    //   this.props.getProducts()
    // }
    // console.log('products....', this.props.products)
    let selectedProduct = this.props.products.filter(product => {
      if (product.id === parseInt(this.props.match.params.productId)) {
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
    if (!this.props.user.isAdmin) {
      return <Redirect to="/products" />
    }

    // console.log(this.state)
    return (
      <div className="edit-form">
        <h1>Edit Product</h1>
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
          name="imgUrl"
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
          <option value="1">Wands</option>
          <option value="2">Brooms</option>
          <option value="3">Robes</option>
          <option value="4">Misc</option>
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

        <button
          type="button"
          onClick={async () => {
            await this.props.updateProduct({
              id: this.state.id,
              name: this.state.name,
              imgUrl: this.state.imgUrl,
              description: this.state.description,
              price: this.state.price,
              categoryId: parseInt(this.state.categoryId, 10),
              inventory: this.state.inventory
            })

            this.props.history.push('/products')
          }}
        >
          Update Product
        </button>
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
    // getProducts: () => dispatch(fetchProductsFromServer())
    updateProduct: product => dispatch(updateProductOnServer(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
