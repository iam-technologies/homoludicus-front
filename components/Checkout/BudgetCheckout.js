import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Link } from '../../routes';

import { cartsActs, showLoginActs } from '../../redux/actions';
import { MobileHeader } from '../common';
import CartAside from '../shoppingCart/CartAside';
import FooterCheckout from './Footer';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import OrderMessage from './OrderMessage';

import infoSource from '../../utils/infoSource';


class BudgetCheckout extends Component {
  constructor(props) {
    super(props);
    const { location: { state: { order } } } = this.props;

    this.state = {
      indexTab: 0,
      redirect: false,
      loadingUser: false, // eslint-disable-line
      method: '',
      userName: '',
      amountTotal: 0,
      numOrder: '',
      item: order,
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
    const { item } = this.state;
    this.onCart.addPayOrder(item);
  }

  componentWillUnmount() {
    this.onCart.addPayOrder();
  }

  // Update info in item
  onChange(path, value, changeState = false) {
    console.log('path / value =', path, ' / ', value);
    const { item } = this.state;
    let finalValue = value;

    if (path === 'email') {
      finalValue = value.toLowerCase();
    }

    if (path !== 'paymentMethod' && _.get(item, 'paymentMethod', '') !== '') {
      const paymentMethod = _.get(item, 'paymentMethod', '');

      if (paymentMethod === 'paypal') delete item.paymentMethod;
    }

    // if changeState is false
    if (!changeState) {
      _.set(item, path, finalValue);

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
    const { user, history } = this.props;
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
    if (redirect) return <Redirect to="/" />;

    return (
      <section className="app_checkout" ref={this.refCheckout}>
        <MobileHeader
          text={this.getTitle(indexTab)}
        />

        <div className="app_checkout-left">
          <header className="app_checkout-header">
            <Link route="/">
              <a className="link">
                <img src="/images/logo_search.png" alt={infoSource.companyName} />
              </a>
            </Link>
          </header>

          <div className="app_checkout-main">
            <div className="app_checkout-step">
              <div
                className={`step_header ${indexTab === 0 ? 'active' : ''}`}
              >01 INFORMACIÓN DE ENVÍO
              </div>

              <div
                className={`step_header ${indexTab === 1 ? 'active' : ''}`}
              >02 SELECCIÓN DE TRANSPORTE
              </div>

              <div
                className={`step_header ${indexTab === 2 ? 'active' : ''}`}
              >03 MÉTODO DE PAGO
              </div>

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
                    disabled
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
            onSubmitOrder={this.onSubmitOrder}
            country={false}
            disabled
          />

          <div className="app_checkout-legal">
            <strong>Información básica sobre protección de datos</strong><br />
            <strong>Responsable:</strong> {infoSource.compNameCap} &nbsp;(
            <Link route="/legal/cookies" target="_blank">
              <a>+info</a>
            </Link>)<br />
            <strong>Finalidad:</strong> Informarle sobre descuentos y nuevos productos&nbsp;(
            <Link route="/legal/privacy" target="_blank">
              <a>+info</a>
            </Link>
            )<br />
            <strong>Legitimación:</strong> Consentimiento del interesado<br />
            <strong>Destinatarios:</strong> No se comunican datos a terceros, salvo obligación legal&nbsp;(
            <Link route="/legal/privacy" target="_blank">
              <a>+info</a>
            </Link>
            )<br />
            <strong>Derechos:</strong> Acceder, rectificar y suprimir los datos, así como otros derechos, como se explica en la información adicional&nbsp;(
            <Link route="/legal/privacy" target="_blank">
              <a>+info</a>
            </Link>
            )<br />
            <strong>Información adicional:</strong> Puede consultar información adicional y detallada en nuestra página sobre Términos de Privacidad&nbsp;(
            <Link route="/legal/privacy" target="_blank">
              <a>+info</a>
            </Link>
            )
          </div>

        </div>

        <div className="app_checkout-right">
          <CartAside
            disabled
            removeBtns
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
}))(BudgetCheckout);
