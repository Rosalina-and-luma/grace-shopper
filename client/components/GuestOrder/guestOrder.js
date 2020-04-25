import React from 'react'
import '../Orders/orders.css'

const GuestOrder = () => {
  console.log(JSON.parse(localStorage.getItem('products')))
  let localData = JSON.parse(localStorage.getItem('products'))
  return (
    <div>
      <h1>In guest cart</h1>
      {localData.map(product => {
        return (
          <div key={product.id} className="orders-section">
            <img src={product.imgUrl} />
            <span className="name"> {product.name}</span>
            <span className="unitPrice">{product.price}</span>
            <button type="button">+</button>
            <label className="quantity">{product.quantity}</label>
            <button type="button">+</button>
          </div>
        )
      })}
    </div>
  )
}

export default GuestOrder
