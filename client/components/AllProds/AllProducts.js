import React from 'react'
import {connect} from 'react-redux'
// import { fetchCampusesFromServer } from '../reducer/allProds'

export class AllProducts extends React.Component {
  constructor() {
    super()
  }

  // compondetDidMount() {
  //   const { getProducts } = this.props
  //   getProducts()
  // }

  render() {
    // const { products } = this.props

    return (
      <div>
        <h1>All Products</h1>
        {/* {
          products.map(product => {
            return (
              <div key={product.id}>
                <img src={product.imgUrl}/>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
              </div>
            )
          })
        } */}
      </div>
    )
  }
}

// const mapState = (state) => {
//   return {
//     products: state.products
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getProducts: () => dispatch(fetchCampusesFromServer())
//   }
// }

// export default connect(mapState, mapDispatch)(AllProducts)
