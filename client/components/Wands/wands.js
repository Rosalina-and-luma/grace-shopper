import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWands, fetchWandsFromServer} from '../../reducer/allProds'
import AllProductsUI from '../AllProducts/AllProductsUI'

class Wands extends Component {
  componentDidMount() {
    const {getAllWands, fetchAllWandsFromServer, products} = this.props
    if (products.length) {
      getAllWands()
    } else {
      fetchAllWandsFromServer()
    }
  }
  render() {
    const {wands, isLoading} = this.props
    if (isLoading) return <h1>loading....</h1>

    return (
      <div>
        <h1>Buy your wand here!</h1>
        {wands.map(wand => {
          return (
            <div key={wand.id}>
              <AllProductsUI product={wand} />
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.allProducts.products,
    wands: state.allProducts.wands,
    isLoading: state.allProducts.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllWands: () => {
      dispatch(getWands())
    },
    fetchAllWandsFromServer: () => {
      dispatch(fetchWandsFromServer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wands)
