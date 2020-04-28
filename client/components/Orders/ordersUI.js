import React from 'react'

const OrdersUI = props => {
  const {product} = props
  return (
    <div>
      <img src={product.imgUrl} />
      <span className="name">{product.name}</span>
      <span className="unitPrice">Unit Price: ${product.unitPrice}</span>
      <button
        type="button"
        onClick={() => {
          props.addQuantity({
            orderId: product.orderId,
            productId: product.id
          })
        }}
      >
        +
      </button>

      <span className="quantity">Quantity: {product.quantity}</span>

      <button
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
      <label className="subtotal">Subtotal: ${product.subTotal}</label>
    </div>
  )
}

export default OrdersUI
