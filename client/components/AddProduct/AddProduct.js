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

    let disabled = true
    if (this.state.name && this.state.price && this.state.inventory) {
      disabled = false
    }

    return (
      <div className="edit-form">
        <h1>Add New Product</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">
            Name {!this.state.name.trim() && <span>(required)</span>}
          </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="imgUrl">ImageURL</label>
          <input
            type="text"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="price">
            Price {!this.state.price && <span>(required)</span>}
          </label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <br />

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
          <br />

          <label htmlFor="inventory">
            Inventory {!this.state.inventory && <span>(required)</span>}
          </label>
          <input
            type="text"
            name="inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
          />
          <br />

          <button type="submit" disabled={disabled}>
            Add Product
          </button>
        </form>
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
