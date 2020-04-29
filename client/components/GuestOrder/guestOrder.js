import React, {Component} from 'react'
import './guestOrder.css'
import {NavLink} from 'react-router-dom'

class GuestOrder extends Component {
  constructor() {
    super()
    this.state = {
      allProducts: JSON.parse(localStorage.getItem('products')),
      total: 0
    }
  }

  componentDidMount() {
    this.getTotal()
  }

  getTotal = () => {
    if (this.state.allProducts && this.state.allProducts.length) {
      let sumTotal = this.state.allProducts.reduce((total, prod) => {
        total += prod.subTotal
        return total
      }, 0)

      this.setState({
        total: sumTotal
      })
    }
  }

  addQuantity = id => {
    let oldProducts = [...this.state.allProducts]
    let updatedProducts = oldProducts.filter(product => {
      if (product.id === id) {
        product.quantity += 1
        product.subTotal = product.quantity * product.price
      }
      return product
    })

    this.setState({
      allProducts: [...updatedProducts]
    })

    this.getTotal()

    localStorage.setItem('products', JSON.stringify(this.state.allProducts))
  }

  subtractQuantity = id => {
    let oldProducts = [...this.state.allProducts]
    let updatedProducts = oldProducts.filter(product => {
      if (product.id === id && product.quantity > 0) {
        product.quantity -= 1
        product.subTotal = product.quantity * product.price
      }

      return product
    })

    updatedProducts.forEach((prod, index) => {
      if (prod.quantity === 0) {
        updatedProducts.splice(index, 1)
      }
    })

    this.setState({
      allProducts: [...updatedProducts]
    })

    this.getTotal()

    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  removeProduct = id => {
    let oldProducts = [...this.state.allProducts]

    let updatedTotal = this.state.total

    let updatedProducts = oldProducts.filter(prod => {
      if (prod.id === id) {
        updatedTotal -= prod.subTotal
      } else {
        return prod
      }
    })

    this.setState({
      allProducts: [...updatedProducts],
      total: updatedTotal
    })

    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  checkout = () => {
    localStorage.removeItem('products')
  }

  render() {
    return (
      <div>
        <h1>Your Cart: </h1>

        <div className="outer-container">
          {this.state.allProducts && this.state.allProducts.length ? (
            this.state.allProducts.map(product => {
              return (
                <div key={product.id} className="orders-section">
                  <div className="item-info">
                    <NavLink to={`/products/${product.id}`}>
                      <img src={product.imgUrl} />
                    </NavLink>
                    <div className="inner-info">
                      <span className="name"> {product.name}</span>
                      <span className="unitPrice">
                        Unit Price: ${product.price}
                      </span>
                    </div>
                  </div>

                  <div className="quantity">
                    <button
                      className="quant-button"
                      type="button"
                      onClick={() => {
                        this.subtractQuantity(product.id)
                      }}
                    >
                      -
                    </button>
                    <label className="quantity">
                      Quantity: {product.quantity}
                    </label>

                    <button
                      className="quant-button"
                      type="button"
                      onClick={() => {
                        this.addQuantity(product.id)
                      }}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.removeProduct(product.id)
                      }}
                    >
                      Remove
                    </button>
                    <span className="subtotal">Total: ${product.subTotal}</span>
                  </div>
                </div>
              )
            })
          ) : (
            <h1> Your cart is empty</h1>
          )}
        </div>

        <div className="page-container">
          {this.state.total > 0 && (
            <div>
              <span>Total: ${this.state.total}</span>
              <br />
              <NavLink to="/checkout">
                <button type="button" onClick={this.checkout}>
                  {' '}
                  Checkout{' '}
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default GuestOrder
