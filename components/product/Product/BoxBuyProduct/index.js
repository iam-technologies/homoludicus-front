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
      count: 0,
      favorite: false,
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

  //Units counter

  onSumUnits = () => {
    const { count } = this.state;
    this.setState({ count: count + 1 })
  }

  onSubstractUnits = () => {
    const { count } = this.state;
    if (count > 0) {
      this.setState({ count: count - 1 })
    }
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
    const { count } = this.state;
    const productAvailable = _.get(item, 'available');

    const oldPrice = priceCalc.showPriceNotOffer(item);
    const notAvailable = priceCalc.checksExceptions(item, config);
    const typeNotAvailable = typeof notAvailable === 'string';

    const isPack = _.get(item, 'type') === 'pack';
    const btnText = index >= 0 ? 'Actualizar producto' : 'Añadir al carrito';
    const price = parseFloat(item.price);
    const totalPrice = (price * 1.21).toFixed(2);

    const featureTitles = [
      'Referència',
      'Stock',
      'Disponibilitat',
      'Punts Homoludicus',
      'Resum:'
    ];

    const disponible = item.available === true ? 'Disponible' : 'No disponible';

    const features = [
      item.reference,
      item.stock,
      disponible,
      item.reference
    ];

    return (
      <div className="a_p-buy_p">
        <div className="img-features-div">
          <div className="a_p-buy_img">
            <Image alt={alt} src={src} />
          </div>
          <div className="product-features">
            <div className="product-features-div">
              <div className="features-titles">
                {featureTitles.map((title, i) => {
                  return <p
                    className='product-features-title'
                    key={i}
                  >
                    {title}
                  </p>
                })}
              </div>
              <div className="features">
                {features.map((feature, i) => {
                  return <p
                    className="product-feature"
                    key={i}
                  >
                    {feature}
                  </p>
                })}
              </div>
            </div>
            <p className="a_p-buy_p-small_info" itemProp="disambiguatingDescription">
              {_.get(item, 'shortDesc.es', '').substr(0, 110)}...
              <p
                className="link_to_info_product"
                onClick={this.onClickMoreInfo}
              >
                (+info)
              </p>
            </p>
            <div className="product-price-sum">
              <div className="quantity-selector-div">
                <p className="price-title">Quantitat:</p>
                <div className="selector-wrapper">
                  <input type="number" min="0" max="99" value={count} />
                  <div className="arrows">
                    <div className="button-div">
                      <button className="up-arrow" type="button" onClick={this.onSumUnits}>
                        <img src="/icon/icon-up-grey.svg" />
                      </button>
                    </div>
                    <div className="button-div">
                      <button className="up-arrow" type="button" onClick={this.onSubstractUnits}>
                        <img src="/icon/icon-down-grey.svg" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-price">
                <p className="price-title">Preu:</p>
                <p className="total-price">{totalPrice} €</p>
                <p className="impostos">Impostos inclosos</p>
              </div>
            </div>
            {//Add to Cart
              productAvailable ? (
                <ButtonInput
                  className="add-to-cart-button"
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
          </div>
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
