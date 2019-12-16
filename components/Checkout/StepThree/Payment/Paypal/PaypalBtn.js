import _ from 'lodash';
import Loader from 'react-loaders';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import settings from '../../../../../settings';
import { api } from '../../../../../serverServices';


class PaypalBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showButton: false
    };

    this.onAuthorize = this.onAuthorize.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onPayment = this.onPayment.bind(this);
  }

  onAuthorize(data, actions) {
    this.props.getClick();

    return actions.payment.execute().then((paymentData) => {
      if (paymentData.state === 'approved') {
        const { item, onSubmitOrder } = this.props;
        this.setState({ loading: true });

        api.orders.upsert({ item, cancel: false, token: paymentData.id }, _.get(item, '_id', ''), (error, res) => {
          if (res) {
            delete item._id;

            onSubmitOrder('success', res.data);
          }
        });
      }
    });
  }

  onPayment(data, actions) {
    this.props.getClick();

    const { item: { amountTotal } } = this.props;

    return actions.payment.create({
      transactions: [
        { amount: { total: amountTotal, currency: 'EUR' } }
      ]
    });
  }

  onCancel() {
    const { item, onChange } = this.props;

    api.orders.upsert({ item, cancel: true }, _.get(item, '_id', ''), () => {
      const newItem = { ...item };

      newItem._id = '';
      delete newItem.paymentMethod;
      delete newItem.status;

      onChange('', { item: newItem }, true);
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    console.log('TCL: staticgetDerivedStateFromProps -> prevState.showButton', prevState.showButton);
    console.log('TCL: staticgetDerivedStateFromProps -> isScriptLoaded', isScriptLoaded);
    console.log('TCL: staticgetDerivedStateFromProps -> isScriptLoadSucceed', isScriptLoadSucceed);
    if (!prevState.showButton && isScriptLoaded && isScriptLoadSucceed) {
      return { showButton: true };
    }

    return null;
  }

  render() {
    const { showButton, loading } = this.state;

    if (!showButton) return null;

    if (loading) {
      return (
        <Loader type="ball-beat" color="#97DECC" />
      );
    }

    const PayPalButton = window.paypal.Button.driver('react', { React, ReactDOM });

    return (
      <PayPalButton
        commit
        client={settings.paypalClientApi}
        env={settings.paypalEnv}
        onAuthorize={this.onAuthorize}
        onCancel={this.onCancel}
        onError={this.onCancel}
        payment={this.onPayment}
      />
    );
  }
}

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalBtn);
