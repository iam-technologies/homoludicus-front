import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements';
import Alert from 'react-s-alert';
import Loader from 'react-loaders';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { cartsActs } from '../../../../../redux/actions';
import { api } from '../../../../../serverServices';
import { msgUI, checkFields, styles } from '../../../../../utils';
import { validateStep } from '../../../helpers';
import InputCreditCard from './InputCreditCard';
import { TextInput, ButtonInput } from '../../../../common';

class CreditCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.onCart = bindActionCreators(cartsActs, props.dispatch);
    this.onChange = props.onChange.bind(this);
    this.onErrorCard = this.onErrorCard.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripeSubmit = this.stripeSubmit.bind(this);
  }

  onErrorCard(e) {
    const { onChange } = this.props;

    onChange('', { errors: checkFields.validateCreditCard(e) }, true);
  }


  onSubmit() {
    const { item, onChange } = this.props;
    const { loading } = this.state;

    if (!loading) {
      this.setState({ loading: true });

      validateStep({ ...item }, 2, (error, res) => {
        if (error) {
          this.setState({ loading: false });

          onChange('', { errors: error }, true);
        } else {
          this.stripeSubmit(res);
        }
      });
    }
  }

  stripeSubmit(item) {
    const { stripe, onSubmitOrder } = this.props;
    stripe.createToken({ name: _.get(item, 'paymentMethodInfo.name') }).then(({ error, token }) => {
      if (!token) {
        this.setState({ loading: false });

        if (error) this.onErrorCard({ error });
      } else {
        api.orders.upsert({ item, token: token.id }, '', (err, res) => {
          if (err) {
            if (_.get(err, 'data.type', '') === 'fail-payment-card') {
              onSubmitOrder('error');
              return;
            }
            let msg = msgUI.getText(`order_validation.${_.get(err, 'data.type', '')}`);

            if (msg === '') { msg = msgUI.getText('order_validation.invalid-order'); }

            if (err.data && err.data.length > 0) {
              const msgDiscount = err.data.filter(e => e.name === 'discount');

              if (msgDiscount.length > 0) {
                msg = msgUI.get(msgDiscount, 'discount');

                this.onCart.removeDiscount();
              }
            }

            Alert.warning(msg);
            this.setState({ loading: false });
          }

          if (res) {
            onSubmitOrder('success', res.data);
          }
        });
      }
    });
  }


  render() {
    const { item, errors } = this.props;
    const { loading } = this.state;

    return (
      <div className="credit_card_ui">
        <InputCreditCard
          error={msgUI.get(errors, 'creditCardNumber')}
          label="Número de tarjeta"
          srcImg="/images/icon_card.png"
          onChange={this.onErrorCard}
        >
          <CardNumberElement
            placeholder="Número de tarjeta"
            style={styles.stripe}
          />
        </InputCreditCard>

        <div className="credit_card_ui-group">
          <TextInput
            error={msgUI.get(errors, 'paymentMethodInfo.name')}
            hintLabel="Nombre en tarjeta"
            label="Nombre en tarjeta"
            onChange={this.onChange}
            path="paymentMethodInfo.name"
            value={_.get(item, 'paymentMethodInfo.name', '')}
          />

          <InputCreditCard
            error={msgUI.get(errors, 'creditCardExpiry')}
            label="Fecha caducidad"
            onChange={this.onErrorCard}
          >
            <CardExpiryElement
              style={styles.stripe}
            />
          </InputCreditCard>

          <InputCreditCard
            error={msgUI.get(errors, 'creditCardCCV')}
            label="CVV"
            onChange={this.onErrorCard}
            srcImg="/images/icon_info_cvv.png"
          >
            <CardCVCElement
              style={styles.stripe}
            />
          </InputCreditCard>
        </div>

        <div className="btn_submit_buy">
          <ButtonInput
            label={loading ? <Loader type="ball-beat" color="#FFFFFF" /> : 'CONFIRMAR COMPRA'}
            onClick={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}


CreditCardForm.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitOrder: PropTypes.func.isRequired,
  stripe: PropTypes.shape({}).isRequired
};

export default connect()(injectStripe(CreditCardForm));
