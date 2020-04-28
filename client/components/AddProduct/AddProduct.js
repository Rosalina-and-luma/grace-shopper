import React, {Component, useReducer} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createProductOnServer} from '../../reducer/allProds'

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      imgUrl: '',
      description: '',
      price: 0,
      categoryId: 1,
      inventory: 0
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async event => {
    const {history, addProduct} = this.props
    const {name, imgUrl, description, price, categoryId, inventory} = this.state

    event.preventDefault()

    await addProduct({
      name,
      imgUrl,
      description,
      price: price,
      categoryId: parseInt(categoryId, 10),
      inventory
    })

    history.push('/products')
  }

  render() {
    if (!this.props.user.isAdmin) {
      return <Redirect to="/products" />
    }

    return (
      <div>
        <h1>Add a New Product</h1>
        <div className="edit-form">
          <form onSubmit={this.handleSubmit}>
            <div className="edit-condition">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label htmlFor="imgUrl">ImageURL</label>
              <input
                type="text"
                name="imgUrl"
                value={this.state.imgUrl}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>

            <div className="edit-condition">
              <label htmlFor="categoryId">Category</label>
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
              <label htmlFor="inventory">Inventory</label>
              <input
                type="text"
                name="inventory"
                value={this.state.inventory}
                onChange={this.handleChange}
              />
            </div>

            <div className="action-button">
              <button type="submit">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(createProductOnServer(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
