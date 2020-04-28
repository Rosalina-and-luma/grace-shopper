import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  fetchSingleProduct,
  updateProductOnServer
} from '../../reducer/singleProduct'
import './editProduct.css'

class EditProduct extends Component {
  constructor() {
    super()
    this.state = {
      id: null,
      name: '',
      imgUrl: '',
      description: '',
      price: 0,
      categoryId: 0,
      inventory: 0
    }
  }
  async componentDidMount() {
    const {productId} = this.props.match.params

    await this.props.getSelectedProduct(productId)

    if (this.props.selectedProduct) {
      // console.log(this.props.selectedProduct)
      const {
        id,
        name,
        imgUrl,
        description,
        price,
        categoryId,
        inventory
      } = this.props.selectedProduct

      this.setState({
        id,
        name,
        imgUrl,
        description,
        price,
        categoryId,
        inventory
      })
    }
  }

  handleChange = e => {
    console.log(this.state)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {updateProduct, history} = this.props

    await updateProduct(this.state)
    history.push(`/products/${this.state.id}`)
  }

  render() {
    if (!this.props.user.isAdmin) {
      return <Redirect to="/products" />
    }

    return (
      <div>
        <h1>Edit Product</h1>
        <div className="edit-form">
          <form onSubmit={this.handleSubmit}>
            <div className="edit-condition">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label>ImageURL</label>
              <input
                type="text"
                name="imageUrl"
                value={this.state.imgUrl}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label>Category</label>
              <select
                value={this.state.categoryId}
                onChange={this.handleChange}
                name="categoryId"
              >
                <option value="1">Wands</option>
                <option value="2">Brooms</option>
                <option value="3">Robes</option>
                <option value="4">Misc</option>
              </select>
            </div>

            <div className="edit-condition">
              <label>Inventory</label>
              <input
                type="text"
                name="inventory"
                value={this.state.inventory}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit">Update Product</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.singleProduct.selectedProduct,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSelectedProduct: id => dispatch(fetchSingleProduct(id)),
    updateProduct: product => dispatch(updateProductOnServer(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
