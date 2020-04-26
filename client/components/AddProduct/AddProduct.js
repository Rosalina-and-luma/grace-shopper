import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createProductOnServer} from '../../reducer/allProds'

class AddProduct extends Component {
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
      price,
      categoryId: parseInt(categoryId, 10),
      inventory
    })

    history.push('/products')
  }

  render() {
    console.log(this.state)
    return (
      <div className="edit-form">
        <h1>Add New Product</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
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

          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="categoryId">Category</label>
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

          <label htmlFor="inventory">Inventory</label>
          <input
            type="text"
            name="inventory"
            value={this.state.inventory}
            onChange={this.handleChange}
          />
          <br />

          <button type="submit">Add Product</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(createProductOnServer(product))
  }
}

export default connect(null, mapDispatchToProps)(AddProduct)
