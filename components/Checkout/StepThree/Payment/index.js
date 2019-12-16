import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RadioInput } from '../../../common';
import CreditCard from './CreditCard';
import Paypal from './Paypal';
import WireTransfer from './WireTransfer';
// import Terms from '../Terms';
import TermsBis from '../TermsBis';

// import Privacy from '../Privacy';
import PrivacyBis from '../PrivacyBis';

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.onChange = props.onChange.bind(this);
  }

  render() {
    const { item, errors, onSubmitOrder, onTermsChange } = this.props;
    const acceptTerms = _.get(item, 'acceptTerms', false);
    const newsletter = _.get(item, 'newsletter', false);

    const paymentMethod = _.get(item, 'paymentMethod', '');

    const termsChecks = (
      <div className="check_type_terms">
        <RadioInput
          onChange={onTermsChange}
          path="acceptTerms"
          value={_.get(item, 'acceptTerms', false)}
          active={acceptTerms === true}
        // >Acepto los términos de servicio (<Terms />) y la política de privacidad (<Privacy />).
        >Acepto los términos de servicio (<TermsBis />) y la política de privacidad (<PrivacyBis />).
        </RadioInput>

        <RadioInput
          onChange={onTermsChange}
          path="newsletter"
          value={_.get(item, 'newsletter', false)}
          active={newsletter === true}
        >Quiero suscribirme al newsletter.
        </RadioInput>
      </div>
    );

    return (
      <div className="payment_method">
        <p className="title">Método de pago</p>

        <div className="payment_method-check">
          <RadioInput
            active={paymentMethod === 'card'}
            onChange={this.onChange}
            path="paymentMethod"
            value="card"
          >
            <div className="payment_method-check-box_text">
              <div className="check_flex_first">
                <p className="title_method">Tarjeta de crédito o débito</p>
                <div className="img_method">
                  <img src="../../../../static/images/logo_credit_cards.png" alt="Targeta de crédito" />
                </div>
              </div>
              <p className="description">Pago seguro mediante tarjeta de crédito o débito a través de la plataforma de pago Stripe.</p>
            </div>
          </RadioInput>
          {
            paymentMethod === 'card' && (
              <CreditCard
                onChange={this.onChange}
                item={item}
                errors={errors}
                onSubmitOrder={onSubmitOrder}
              />
            )
          }
        </div>

        {paymentMethod === 'card' && termsChecks}

        <div className="payment_method-check">
          <RadioInput
            active={paymentMethod === 'paypal'}
            onChange={this.onChange}
            path="paymentMethod"
            value="paypal"
          >
            <div className="payment_method-check-box_text">
              <div className="check_flex_first">
                <p className="title_method">PayPal</p>
                <div className="img_method">
                  <img src="../../../../static/images/logo_paypal.png" alt="PayPal" />
                </div>
              </div>
              <p className="description">Si tienes cuenta con Paypal podrás hacer el pago de forma totalmente segura.</p>
            </div>
          </RadioInput>
          {
            paymentMethod === 'paypal' && (
              <div className="paypal_ui">
                <div className="btn_submit_buy">
                  <Paypal
                    onChange={this.onChange}
                    item={item}
                    onSubmitOrder={onSubmitOrder}
                  />
                </div>
              </div>
            )
          }
        </div>

        {paymentMethod === 'paypal' && termsChecks}

        <div className="payment_method-check">
          <RadioInput
            active={paymentMethod === 'wireTransfer'}
            onChange={this.onChange}
            path="paymentMethod"
            value="wireTransfer"
          >
            <div className="payment_method-check-box_text">
              <div className="check_flex_first">
                <p className="title_method">Transferencia Bancaria</p>
                <div className="img_method">
                  <img src="../../../../static/images/logo_wire_transfer.png" alt="Transferencia Bancaria" />
                </div>
              </div>
              <p className="description">Realiza el ingreso integro desde tu banco al número de cuenta que te facilitaremos. </p>
            </div>
          </RadioInput>
          {
            paymentMethod === 'wireTransfer' && (
              <WireTransfer
                onChange={this.onChange}
                item={item}
                onSubmitOrder={onSubmitOrder}
              />
            )
          }
        </div>

        {paymentMethod === 'wireTransfer' && termsChecks}


      </div>
    );
  }
}


Payment.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitOrder: PropTypes.func.isRequired
};
