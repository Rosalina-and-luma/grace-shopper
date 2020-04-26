import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, UserHome} from './components'
import SingleProduct from './components/singleProduct'
import {me} from './store'
import AllProducts from './components/AllProducts/AllProducts'
import EditProduct from './components/EditProduct/editProduct'
import AddProduct from './components/AddProduct/AddProduct'
import Signup from './components/Signup/signup'
import Homepage from './components/Homepage/homePage'
import User from './components/User/User'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/add" component={AddProduct} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route
          exact
          path="/products/:productId/update"
          component={EditProduct}
        />

        <Route path="/user" component={User} />

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    // isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
