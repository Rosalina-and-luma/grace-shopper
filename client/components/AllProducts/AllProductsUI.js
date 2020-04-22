import React from 'react'

const AllProductsUI = props => {
  console.log('In UI', props)
  const {product} = props
  return (
    <div>
      <img src={product.imgUrl} height="50px" />
      <p>{product.name}</p>
      <p>{product.price}</p>
      <button>Buy</button>
    </div>
  )
}

export default AllProductsUI
