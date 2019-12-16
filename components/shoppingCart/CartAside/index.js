import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import { showCartPopupActs, cartsActs } from '../../../redux/actions';
import { dataFormat, priceCalc } from '../../../utils';
import { withWindowResize } from '../../hoc';
import { Badge } from '../../common';
import Header from './Header';
import ItemCart from './ItemCart';
import Discount from './Discount';


class CartAside extends Component {
  constructor(props) {
    super(props);

    this.onShowCartPopup = bindActionCreators(showCartPopupActs, props.dispatch);
    this.onCart = bindActionCreators(cartsActs, props.dispatch);

    this.onClosePopup = this.onShowCartPopup.hidden.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onAddCart = this.onAddCart.bind(this);
  }


  onRemoveItem(index) {
    const { cart } = this.props;

    if (!cart.loading) {
      this.onCart.removeProduct(index);
    }
  }

  onAddCart(item) {
    const { cart, isPopup } = this.props;

    if (cart.loading) return;

    this.onCart.addProduct(item, isPopup);
  }

  render() {
    const { className, isPopup, cart, shipping, showDiscount, removeBtns, screen } = this.props;

    // Disabled and shippingPrice come from budgetSent orders, they are fixed.
    const disabled = _.get(cart, 'item.disabled', false);
    const shippingPrice = _.get(cart, 'item.shippingPrice', 0);

    const numItem = _.get(cart, 'item.products', []).length;
    const price = priceCalc.getCartSubTotal(_.get(cart, 'item.products', []));

    let renderShipping = null;

    if (shippingPrice !== 0) {
      renderShipping = <p>{dataFormat.formatCurrency(shippingPrice)}</p>;
    } else if (shipping === '') {
      renderShipping = <p>---</p>;
    } else {
      renderShipping = shipping === 0
        ? renderShipping = <Badge small>Gratis</Badge>
        : <p>{dataFormat.formatCurrency(shipping)}</p>;
    }

    const discount = _.get(cart, 'item.discount', '');
    const priceDiscount = priceCalc.getDiscount(price, discount, _.get(cart, 'item', {}));

    return (
      <section className={`app_cart_aside ${className}`}>

        <Header
          isPopup={isPopup}
          numItems={_.get(cart, 'item.products', []).length}
        />

        {
          numItem <= 0 ? (
            <div className="app_cart_aside-cart_empty">Tu carrito está vacío.</div>
          ) : (
            <Fragment>
              <div className="app_cart_aside-list">
                {
                  !disabled && _.get(cart, 'item.products', []).map((elem, index) => (
                    <ItemCart
                      index={index}
                      item={elem}
                      key={`${_.get(elem, 'product._id', '')}/${index.toString()}`}
                      onClosePopup={isPopup ? this.onClosePopup : undefined}
                      onAddCart={this.onAddCart}
                      onRemove={this.onRemoveItem}
                      removeBtns={removeBtns}
                    />
                  ))
                }
                {
                  disabled && _.get(cart, 'item.products', []).map((elem, index) => (
                    <ItemCart
                      index={index}
                      item={elem}
                      key={`${_.get(elem, 'product._id', '')}/${index.toString()}`}
                      onClosePopup={isPopup ? this.onClosePopup : undefined}
                      onAddCart={this.onAddCart}
                      onRemove={this.onRemoveItem}
                      removeBtns
                    />
                  ))
                }
              </div>

              {
                !disabled && numItem > 0 && (screen === 'xs' || screen === 'sm' || showDiscount)
                  ? (<Discount item={cart.item} />) : null
              }

              <div className="app_cart_aside-summary_purchase">
                <div className="line">
                  <p>Subtotal</p>
                  <p>{dataFormat.formatCurrency(price)}</p>
                </div>

                {
                  discount && discount.code && discount.amount > 0 ? (
                    <div className="line">
                      <p>Descuento{discount.type === 'percent' ? ` ${discount.amount}%` : ''}</p>
                      <p>-{dataFormat.formatCurrency(priceDiscount)}</p>
                    </div>
                  ) : null
                }

                <div className="line">
                  <p>Envío</p>

                  {renderShipping}
                </div>

                <div className="line total_pay">
                  <p>Total</p>
                  <p>{dataFormat.formatCurrency(priceCalc.getCartTotal(price, shipping, priceDiscount))}</p>
                </div>
              </div>

              {
                isPopup && !disabled ? (
                  <div className="app_cart_aside-btn_to_buy">
                    <div
                      onClick={this.onClosePopup}
                    >
                      <a className="btn_buy" href="/checkout">
                      REALIZAR PEDIDO
                      </a>
                    </div>
                  </div>
                ) : null
              }
            </Fragment>
          )
        }
      </section>
    );
  }
}


CartAside.propTypes = {
  cart: PropTypes.object.isRequired,
  className: PropTypes.string,
  isPopup: PropTypes.bool,
  showDiscount: PropTypes.bool,
  shipping: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  removeBtns: PropTypes.bool
};

CartAside.defaultProps = {
  className: '',
  isPopup: false,
  showDiscount: false,
  shipping: '',
  removeBtns: false
};

export default withWindowResize(connect(state => ({ cart: state.carts }))(CartAside));
