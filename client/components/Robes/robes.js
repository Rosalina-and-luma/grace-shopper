import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRobes, fetchRobesFromServer} from '../../reducer/allProds'
import AllProductsUI from '../AllProducts/AllProductsUI'

class Robes extends Component {
  componentDidMount() {
    const {getAllRobes, fetchAllRobesFromServer, products} = this.props
    if (products.length) {
      getAllRobes()
    } else {
      fetchAllRobesFromServer()
    }
  }
  render() {
    const {robes, isLoading} = this.props
    if (isLoading) return <h1>loading....</h1>
    return (
      <div>
        <h1>Here are your house robes!</h1>
        {robes &&
          robes.map(robe => {
            return (
              <div key={robe.id}>
                <AllProductsUI product={robe} />
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
    robes: state.allProducts.robes,
    isLoading: state.allProducts.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllRobes: () => {
      dispatch(getRobes())
    },
    fetchAllRobesFromServer: () => {
      dispatch(fetchRobesFromServer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Robes)
