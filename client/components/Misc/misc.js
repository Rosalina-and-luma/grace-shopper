import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMisc, fetchMiscFromServer} from '../../reducer/allProds'
import AllProductsUI from '../AllProducts/AllProductsUI'

class Misc extends Component {
  componentDidMount() {
    const {getAllMiscItems, fetchAllMiscFromServer, products} = this.props
    if (products.length) {
      getAllMiscItems()
    } else {
      fetchAllMiscFromServer()
    }
  }
  render() {
    const {miscItems, isLoading} = this.props
    if (isLoading) return <h1>loading....</h1>
    return (
      <div>
        <h1>Here are some cool item!!</h1>
        {miscItems &&
          miscItems.map(misc => {
            return (
              <div key={misc.id}>
                <AllProductsUI product={misc} />
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
    miscItems: state.allProducts.miscItems,
    isLoading: state.allProducts.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllMiscItems: () => {
      dispatch(getMisc())
    },
    fetchAllMiscFromServer: () => {
      dispatch(fetchMiscFromServer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Misc)
