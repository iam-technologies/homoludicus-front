import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loaders';
import PropTypes from 'prop-types';
import React, { Fragment, Component } from 'react';

import { configAttrActs, cartsActs } from '../../../../redux/actions';
import { priceCalc } from '../../../../utils';
import { withWindowResize } from '../../../hoc';
import { ButtonInput, FavouritesBtn } from '../../../common';
import Stepper from './Stepper';
import Notify from './Notify';
import { isClient } from '../../../../serverServices/utils';
import Image from '../../../common/Image';

// import Odometer from 'react-odometerjs';
const Odometer = (isClient) ? require('react-odometerjs').default : undefined;

class BoxBuyProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      index: Number.isNaN(props.index) ? -1 : props.index,
      favorite: false
    };

    this.onConfigAttr = bindActionCreators(configAttrActs, props.dispatch);
    this.onCart = bindActionCreators(cartsActs, props.dispatch);

    this.onAddFavorite = this.onAddFavorite.bind(this);
    this.onClickMoreInfo = this.onClickMoreInfo.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.getConfig = this.getConfig.bind(this);
  }

  componentDidMount() {
    this.getConfig();
  }

  componentDidUpdate() {
    this.getConfig();
  }

  componentWillUnmount() {
    this.onConfigAttr.removeAll();
  }

  onAddFavorite() {
    const { favorite } = this.state;

    this.setState({ favorite: !favorite });
  }

  onClickMoreInfo(e) {
    e.preventDefault();
    const ref = document.getElementById('long_desc_product');

    ref.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  onAddToCart() {
    const { index } = this.state;
    const { item, cart, config } = this.props;

    if (cart.loading) return;

    const product = { product: item, config };

    if (index !== -1) {
      this.onCart.updateProduct(product, index);
      return;
    }

    this.onCart.addProduct(product);
  }

  getConfig() {
    const { cart } = this.props;
    const { index, loading } = this.state;

    if (!loading) return;

    if (!cart.loading) {
      const config = _.get(cart, `item.products.${index}.config`, {});
      this.setState({ loading: false });
      this.onConfigAttr.add(config);
    }
  }

  render() {
    const { index, loading } = this.state;
    const { item, cart, config, screen, alt, src } = this.props;
    const productAvailable = _.get(item, 'available');

    const oldPrice = priceCalc.showPriceNotOffer(item);
    const notAvailable = priceCalc.checksExceptions(item, config);
    const typeNotAvailable = typeof notAvailable === 'string';

    const isPack = _.get(item, 'type') === 'pack';
    const btnText = index >= 0 ? 'Actualizar producto' : 'Añadir al carrito';


    return (
      <div className="a_p-buy_p">
        <div className="img-features-div">
        <div className="a_p-buy_img">
          <Image alt={ alt } src={ src } />
        </div>
        <div className="product-features">
          <div className="product-features-div">
            <div className="features-titles">
              <p className="product-features-title">Referència</p>
              <p className="product-features-title">Stock</p>
              <p className="product-features-title">Disponibilitat</p>
              <p className="product-features-title">Punts Homoludicus</p>
              <p className="product-features-title">Resum:</p>
            </div>
            <div className="features">
              <p className="product-feature">{item.reference}</p>
              <p className="product-feature">{item.reference}</p>
              <p className="product-feature">{item.reference}</p>
              <p className="product-feature">{item.reference}</p>
            </div>
          </div>
          <p className="a_p-buy_p-small_info" itemProp="disambiguatingDescription">
            {_.get(item, 'shortDesc.es', '').substr(0, 110)}...
            <p
              className="link_to_info_product"
              onClick={this.onClickMoreInfo}
            >(+info)
            </p>
          </p>
        </div>
        </div>
        {
          (index !== -1 && cart.item === null) || loading ? null : (
            <Stepper
              config={config}
              items={isPack ? _.get(item, 'configStepPack', []) : _.get(item, 'attributes', [])}
              productName={_.get(item, 'name.es', 'artículo')}
              isPack={isPack}
              index={index}
              typeNotAvailable={typeNotAvailable || !productAvailable}
              onAddToCart={this.onAddToCart}
            />
          )
        }

        <div className="a_p-buy_p-buy">
          {
            typeNotAvailable ? <p className="a_p-buy_p-not_available">{notAvailable}</p> : null
          }

          {
            typeNotAvailable ? null : (
              <Fragment>
                <div
                  className={`a_p-buy_p-price ${oldPrice ? 'a_p-buy_p-offer_price' : ''}`}
                  itemProp="offers"
                  itemScope
                  itemType="http://schema.org/Offer"
                >
                  {
                    oldPrice && <p className="a_p-buy_p-old_price">{oldPrice}</p>
                  }
                  <span itemProp="price" content={priceCalc.getUnicode(item, config)}>
                    <Odometer value={priceCalc.get(item, config)} format="(.ddd),dd" />
                  </span>
                  <span itemProp="priceCurrency" content="EUR">€</span>
                  <span className="small_text">impostos inclosos</span>
                </div>

                {
                  screen !== 'lg' && (<FavouritesBtn id={_.get(item, '_id', '')} />)
                }

                {
                  productAvailable ? (
                    <ButtonInput
                      className="a_p-buy_p-add_cart"
                      onClick={this.onAddToCart}
                      label={cart.loading ? <Loader type="ball-beat" color="#FFFFFF" /> : btnText}
                    />
                  ) : (
                    <Notify
                      id={item._id}
                      notifyAvailability={_.get(item, 'notifyAvailability', [])}
                    />
                  )
                }

              </Fragment>
            )
          }
        </div>
      </div>
    );
  }
}


BoxBuyProduct.propTypes = {
  cart: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  index: PropTypes.number
};

BoxBuyProduct.defaultProps = { index: -1 };


export default connect(state => ({
  config: state.configAttr.value,
  cart: state.carts
}))(withWindowResize(BoxBuyProduct));
