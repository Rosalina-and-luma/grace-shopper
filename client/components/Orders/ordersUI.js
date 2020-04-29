import React from 'react'
import './orders.css'

const OrdersUI = props => {
  const {product} = props

  return (
    <div>
      <div className="cart-container">
        <div>
          <img src={product.imgUrl} className="product-image" />

          <div className="info-container">
            <span className="name">{product.name}</span>
            <span className="unitPrice">${product.unitPrice}</span>
            {/* <span className="quantity">{product.quantity}</span> */}
          </div>
        </div>

        <button
          type="button"
          className="quant-button"
          onClick={() => {
            props.addQuantity({
              orderId: product.orderId,
              productId: product.id
            })
          }}
        >
          +
        </button>

        <label className="quantity" name="quantity">
          {product.quantity}
        </label>

        <button
          className="quant-button"
          type="button"
          onClick={() => {
            props.subtractQuantity({
              orderId: product.orderId,
              productId: product.id
            })
          }}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => {
            props.onDelete({
              orderId: product.orderId,
              productId: product.id
            })
          }}
        >
          Remove
        </button>
        <span>Total Price: ${product.subTotal}</span>
      </div>
    </div>
  )
}

export default OrdersUI
