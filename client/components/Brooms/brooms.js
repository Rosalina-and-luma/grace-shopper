import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getBrooms, fetchBroomsFromServer} from '../../reducer/allProds'
import AllProductsUI from '../AllProducts/AllProductsUI'

class Brooms extends Component {
  componentDidMount() {
    const {getAllBrooms} = this.props
    // getProducts();
    console.log('did mount products', this.props.products)
    // getAllBrooms();
    if (this.props.products.length !== 0) {
      console.log('making call to get brooms')
      getAllBrooms()
    } else {
      console.log('calling brooms from server')
      this.props.fetchBroomsFromServer()
    }
  }

  render() {
    const {brooms, isLoading} = this.props
    if (isLoading) return <h1>loading....</h1>
    return (
      <div>
        <h1>Here are all the brooms!</h1>
        {brooms.map(broom => {
          return (
            <div key={broom.id}>
              <AllProductsUI product={broom} />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.allProducts.products,
  brooms: state.allProducts.brooms,
  isLoading: state.allProducts.isLoading
})

const mapDispatchToProps = dispatch => ({
  getAllBrooms: () => {
    dispatch(getBrooms())
  },
  fetchBroomsFromServer: () => dispatch(fetchBroomsFromServer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Brooms)
