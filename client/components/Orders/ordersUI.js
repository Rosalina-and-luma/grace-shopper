import React from 'react'

const OrdersUI = props => {
  const {product} = props
  return (
    <div>
      <img src={product.imgUrl} />
      <span className="name">{product.name}</span>
      <span>Inventory: {product.inventory}</span>
      <span className="unitPrice">{product.unitPrice}</span>
      <span className="quantity">{product.quantity}</span>
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
      <label className="quantity" name="quantity">
        {product.quantity}
      </label>
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
      <span>{product.subTotal}</span>
    </div>
  )
}

export default OrdersUI
