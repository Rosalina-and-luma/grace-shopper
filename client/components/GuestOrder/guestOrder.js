import React, {Component} from 'react'
import '../Orders/orders.css'

class GuestOrder extends Component {
  // console.log(JSON.parse(localStorage.getItem('products')))
  // let localData = JSON.parse(localStorage.getItem('products'))
  constructor() {
    super()
    this.state = {
      allProducts: JSON.parse(localStorage.getItem('products'))
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
    localStorage.setItem('products', JSON.stringify(this.state.allProducts))
  }

  subtractQuantity = id => {
    let oldProducts = [...this.state.allProducts]
    let updatedProducts = oldProducts.filter((product, index) => {
      if (product.id === id) {
        if (product.quantity > 0) {
          product.quantity -= 1
          product.subTotal = product.quantity * product.price
        } else {
          console.log('inside else')
          updatedProducts.slice(index, 1)
        }
      }
      return product
    })
    this.setState({
      allProducts: [...updatedProducts]
    })
    localStorage.setItem('products', JSON.stringify(this.state.allProducts))
  }

  removeProduct = id => {
    let oldProducts = [...this.state.allProducts]
    console.log('oldProducts', oldProducts)

    let updatedProducts = oldProducts.filter(prod => prod.id !== id)

    this.setState({
      allProducts: [...updatedProducts]
    })

    localStorage.setItem('products', JSON.stringify(updatedProducts))
  }

  render() {
    console.log('guest state', this.state)
    return (
      <div>
        <h1>In guest cart</h1>
        {this.state.allProducts &&
          this.state.allProducts.map(product => {
            return (
              <div key={product.id} className="orders-section">
                <img src={product.imgUrl} />
                <span className="name"> {product.name}</span>
                <span className="unitPrice">{product.price}</span>
                <button
                  type="button"
                  onClick={() => {
                    this.addQuantity(product.id)
                  }}
                >
                  +
                </button>
                <label className="quantity">{product.quantity}</label>
                <button
                  type="button"
                  onClick={() => {
                    this.subtractQuantity(product.id)
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.removeProduct(product.id)
                  }}
                >
                  Remove
                </button>
                <span>SubTotal: {product.subTotal}</span>
              </div>
            )
          })}
      </div>
    )
  }
}

export default GuestOrder
