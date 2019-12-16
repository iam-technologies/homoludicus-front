import _ from 'lodash';
// import { Link, Redirect } from 'react-router-dom';
import Router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { trackEvent } from 'react-with-analytics';
import priceCalc from '../../utils/priceCalc';
import { api } from '../../serverServices';
import { isClient } from '../../serverServices/utils';
import { cartsActs, showLoginActs } from '../../redux/actions';
import { MobileHeader } from '../common';
import CartAside from '../shoppingCart/CartAside';
import FooterCheckout from './Footer';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import OrderMessage from './OrderMessage';
import LegalInfo from './LegalInfo';
import { Link } from '../../routes';
import infoSource from '../../utils/infoSource';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexTab: 0,
      redirect: false,
      loadingUser: false, // eslint-disable-line
      method: '',
      userName: '',
      amountTotal: 0,
      numOrder: '',
      item: {},
      errors: []
    };

    this.refCheckout = React.createRef();

    this.onCart = bindActionCreators(cartsActs, props.dispatch);
    this.onShowLogin = bindActionCreators(showLoginActs, props.dispatch);
    this.showLogin = this.onShowLogin.show.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPrevTab = this.onPrevTab.bind(this);
    this.onNextTab = this.onNextTab.bind(this);
    this.scrollView = this.scrollView.bind(this);
    this.onSubmitOrder = this.onSubmitOrder.bind(this);
    this.onTryAgain = this.onTryAgain.bind(this);
  }

  componentDidMount() {
    this.onCart.getCart();
  }

  componentWillUnmount() {
    const { item } = this.state;

    if (item._id) {
      api.orders.upsert({ item, cancel: true }, _.get(item, '_id', ''), () => {});
    }
  }


  // Update info in item
  onChange(path, value, changeState = false) {
    const { item } = this.state;
    let finalValue = value;

    if (path === 'email') {
      finalValue = value.toLowerCase();
    }

    if (path !== 'paymentMethod'
        && path !== 'acceptTerms'
        && path !== 'newsletter'
        && _.get(item, 'paymentMethod', '') !== '') {
      const paymentMethod = _.get(item, 'paymentMethod', '');
      if (paymentMethod === 'paypal') delete item.paymentMethod;
    }

    // if changeState is false
    if (!changeState) {
      _.set(item, path, finalValue);

      if (path === 'shipping') {
        item.amountTotal = item.amount + _.get(finalValue, 'price', 0);
      }

      if (path === 'sendOrderType' && finalValue === infoSource.companyName) {
        item.amountTotal = item.amount;
      }

      this.setState({ item: { ...item } });
    // if changeState is true.
    } else {
      const newValue = { ...finalValue };

      if (changeState === 'updateProduct') {
        newValue.item = { ...item, ...newValue.item };
      }

      this.setState({ ...newValue });
    }
  }


  // success order.
  onSubmitOrder(method, numOrder = '') {
    window.scrollTo(0, 0);
    const { item } = this.state;

    const userName = item.name;
    const { amountTotal } = item;

    if (method !== 'error') {
      this.setState({ method, item: {}, userName, amountTotal, numOrder });
      trackEvent('Checkout', 'Compra', 'Success'); // category, action, label
      this.onCart.removeCart();
      return;
    }

    this.setState({ method, userName, amountTotal, numOrder });
  }

  // Probar de nuevo si hay error
  onTryAgain() {
    this.setState({ method: '' });
  }

  // Change tab in step-checkout
  onPrevTab() {
    const { indexTab, item } = this.state;

    if (indexTab > 0) {
      this.scrollView();
      this.setState({ indexTab: _.get(item, 'sendOrderType') !== infoSource.companyName ? indexTab - 1 : 0 });
    }
  }

  onNextTab(num = 2) {
    const { indexTab, item } = this.state;

    if (indexTab < 2) {
      this.scrollView();
      this.setState({ indexTab: _.get(item, 'sendOrderType') !== infoSource.companyName ? indexTab + 1 : num });
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const id = api.carts.getSession();
    if (!id) return { redirect: true };

    let { loadingUser } = state;
    const { cart, user } = nextProps;

    const products = _.get(cart, 'products', []);

    const subTotal = priceCalc.getCartSubTotal(products);
    const discount = priceCalc.getDiscount(subTotal, _.get(cart, 'discount', ''), cart);
    const amount = parseFloat(parseFloat(subTotal - discount).toFixed(2));
    let amountTotal = amount;

    const oldAmount = _.get(state, 'item.amount', 0);
    let shipping = _.get(state, 'item.shipping', {});

    if (amount !== oldAmount) {
      if (oldAmount < 45 && amount >= 45) { shipping = {}; }
      if (oldAmount >= 45 && amount < 45) { shipping = {}; }
    }

    if (_.get(cart, 'discount.shippingFree')) {
      shipping = { type: 'free', price: 0 };
    } else if (shipping.type === 'saturday'
      || shipping.type === 'standard'
      || shipping.type === 'canariasStandard'
      || shipping.type === 'canariasFast'
    ) {
      amountTotal += shipping.price;
    } else {
      // amountTotal = undefined; // WHYYYY???
    }

    const item = {};
    if (user && !loadingUser) {
      loadingUser = !loadingUser;
      _.set(item, 'name', user.profile.name);
      _.set(item, 'lastname', user.profile.lastname);
      _.set(item, 'phone', user.profile.phone);
      _.set(item, 'email', _.get(user, 'emails.0.address'));
      _.set(item, 'userId', user._id);
    }

    return { item: { ...state.item, ...item, shipping, cart, amount, amountTotal }, loadingUser };
  }

  getTitle(index) {
    switch (index) {
      case 1: return 'Selección de transporte';
      case 2: return 'Método de pago';
      default: return 'Información de envío';
    }
  }

  // Scroll to change view
  scrollView() {
    const ref = this.refCheckout.current;

    ref.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  render() {
    const {
      indexTab, item, errors, redirect, method, userName, amountTotal, numOrder
    } = this.state;
    const { isLogin, user, history } = this.props;
    // const paymentType = _.get(item, 'paymentType', '');

    if (method) {
      return (
        <OrderMessage
          history={history}
          type={method}
          item={item}
          onError={this.onTryAgain}
          numOrder={numOrder}
          userName={userName}
          amountTotal={amountTotal}
        />
      );
    }
    // if (redirect) return <Redirect to="/" />;
    if (isClient && redirect) return Router.push('/');

    const country = _.get(item, 'sendOrder.country', '') === 'Otros';

    return (
      <section className="app_checkout" ref={this.refCheckout}>
        <MobileHeader
          text={this.getTitle(indexTab)}
        />

        <div className="app_checkout-left">

          <header className="app_checkout-header">
            <Link route="/">
              <a className="link">
                <img src="../../static/images/company/icon_logotipo_neutro.png" alt={infoSource.companyName} />
              </a>
            </Link>

            {
              isLogin ? null : (
                <button
                  className="link_login"
                  onClick={() => this.showLogin(false)}
                  type="button"
                >¿Ya tienes una cuenta?
                </button>
              )
            }

          </header>

          <div className="app_checkout-main">
            <div className="app_checkout-step">
              <div
                className={`step_header ${indexTab === 0 ? 'active' : ''}`}
              >01 INFORMACIÓN DE ENVÍO

              </div>
              {
                !country && (
                  <Fragment>
                    <div
                      className={`step_header ${indexTab === 1 ? 'active' : ''}`}
                    >02 SELECCIÓN DE TRANSPORTE
                    </div>

                    <div
                      className={`step_header ${indexTab === 2 ? 'active' : ''}`}
                    >03 MÉTODO DE PAGO
                    </div>
                  </Fragment>
                )
              }

            </div>

            <SwipeableViews
              index={indexTab}
            >
              {
                indexTab !== 0 ? <div /> : (
                  <StepOne
                    errors={errors}
                    item={item}
                    onChange={this.onChange}
                    user={user}
                  />
                )
              }

              <StepTwo
                active={indexTab === 1}
                item={item}
                onChange={this.onChange}
                onPrevTab={this.onPrevTab}
                user={user}
              />

              {
                indexTab !== 2 ? <div /> : (
                  <StepThree
                    errors={errors}
                    item={item}
                    onChange={this.onChange}
                    onSubmitOrder={this.onSubmitOrder}
                    user={user}
                  />
                )
              }
            </SwipeableViews>
          </div>

          <FooterCheckout
            indexTab={indexTab}
            item={item}
            onChange={this.onChange}
            onNextTab={this.onNextTab}
            onPrevTab={this.onPrevTab}
            country={country}
            onSubmitOrder={this.onSubmitOrder}
          />

          <LegalInfo />

        </div>

        <div className="app_checkout-right">
          <CartAside
            showDiscount
            removeBtns={indexTab === 2}
            shipping={_.get(item, 'shipping.price', '')}
          />
        </div>

      </section>

    );
  }
}

export default connect(state => ({
  cart: { ...state.carts.item },
  user: state.user.user,
  isLogin: state.isLogin.login
}))(Checkout);
