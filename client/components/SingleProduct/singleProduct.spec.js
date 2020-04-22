import React from 'react'
import {expect} from 'chai'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {mock} from 'sinon'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

const adapter = new Adapter()
Enzyme.configure({adapter})

import SingleProduct from './index'
import AllProductsUI from '../AllProducts/AllProductsUI'

import {mapDispatchToProps} from './index'

describe('React', () => {
  describe('<SingleProduct /> Component', () => {
    let singleProd
    let store
    const match = {
      params: {
        productId: 1
      }
    }

    const getSelectedProduct = () => async dispatch => {
      dispatch(mapDispatchToProps())
    }

    // const getSelectedProduct = mock(mapDispatchToProps);

    beforeEach('Create component', () => {
      store = mockStore({
        singleProduct: {
          selectedProduct: [
            {
              id: 1,
              name: 'wand one',
              imgUrl:
                'https://alivans.com/wp-content/uploads/2017/05/ROSEWOOD_THUMB.jpg',
              description: 'this wand rules!',
              price: 10.89,
              category: 'wand',
              inventory: 10
            }
          ]
        },
        isLoading: false
      })

      singleProd = renderer.create(
        <Provider store={store}>
          <SingleProduct
            match={match}
            getSelectedProduct={getSelectedProduct}
          />
        </Provider>
      )
    })

    // it('should dispatch actions.onClick() when onClick() is called', () => {
    //   const dispatch = jest.fn();
    //   mapDispatchToProps(dispatch).getSelectedProduct();
    // });

    it('renders the heading in an h1 tag', () => {
      expect(
        singleProd
          .find('h1')
          .text()
          .trim()
      ).to.be.equal('Single Product')
    })
  })
})
