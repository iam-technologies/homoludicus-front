import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import Loader from 'react-loaders';
import _ from 'lodash';
import Alert from 'react-s-alert';
import { Link } from '../../../routes';

import { api } from '../../../serverServices';
import { validateStep } from '../helpers';
import { msgUI } from '../../../utils';
import { ButtonInput } from '../../common';


export default class FooterCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = { disableNext: false };

    this.onValidateStep = this.onValidateStep.bind(this);
    this.onRequestBudget = this.onRequestBudget.bind(this);
    this.onPrevTab = props.onPrevTab.bind(this);
  }


  // Validar al cambiar entre pasos.
  onValidateStep() {
    const { disableNext } = this.state;
    const { item, indexTab, onChange, onNextTab } = this.props;

    if (disableNext) return;

    this.setState({ disableNext: true });

    validateStep(_.assign({}, item), indexTab, (error, res) => {
      if (error) {
        Alert.warning(msgUI.getText('general.formIncomplete'));

        this.setState({ disableNext: false });
        onChange('', { errors: error }, true);
      } else {
        this.setState({ disableNext: false });
        onChange('', { errors: [], item: res }, true);

        onNextTab();
      }
    });
  }

  onRequestBudget() {
    const { disableNext } = this.state;
    const { item, onChange, onSubmitOrder } = this.props;

    if (disableNext) return;

    this.setState({ disableNext: true });

    validateStep(_.assign({}, item), 0, (error, res) => {
      if (error) {
        Alert.warning(msgUI.getText('general.formIncomplete'));

        this.setState({ disableNext: false });
        onChange('', { errors: error }, true);
      } else {
        const newItem = { ...res, paymentMethod: 'budget', amountTotal: res.amount };

        api.orders.upsert({ item: newItem }, '', (err, response) => {
          if (response) {
            onSubmitOrder('budget', response.data);
            return;
          }

          if (err) {
            let msg = msgUI.getText(`order_validation.${err.type}`);

            if (msg === '') { msg = msgUI.getText('order_validation.invalid-order'); }

            Alert.warning(msg);

            this.setState({ disableNext: false });
            onChange('', { errors: [], item: res }, true);
          }
        });
      }
    });
  }


  render() {
    const { disableNext } = this.state;
    const { indexTab, item, country, disabled } = this.props;

    return (
      <footer className="app_checkout-footer">

        {
          indexTab > 0 && indexTab <= 2 && (
            <button
              className="link"
              onClick={this.onPrevTab}
              type="button"
            >
              <img src="../../../static/images/icon_back_checkout.png" alt="Volver a la tienda" />
              <span>Volver al paso anterior</span>
            </button>
          )
        }

        {
          (indexTab === 0) && !disabled && (
            <Link route="/">
              <a className="link">
                <img src="../../../static/images/icon_back_checkout.png" alt="Volver a la tienda" />
                <span>Volver a la tienda</span>
              </a>
            </Link>
          )
        }

        {
          _.get(item, 'sendOrderType', '') !== '' && indexTab < 2 && !country ? (
            <ButtonInput
              label="CONTINUAR"
              onClick={this.onValidateStep}
            />
          ) : null
        }

        {
          country && (
            <ButtonInput
              label={disableNext ? <Loader type="ball-beat" color="#FFFFFF" /> : 'SOLICITAR PRESUPUESTO'}
              onClick={this.onRequestBudget}
            />
          )
        }
      </footer>
    );
  }
}

FooterCheckout.propTypes = {
  country: PropsTypes.bool.isRequired,
  indexTab: PropsTypes.number.isRequired,
  item: PropsTypes.object.isRequired,
  onChange: PropsTypes.func.isRequired,
  onNextTab: PropsTypes.func.isRequired,
  onPrevTab: PropsTypes.func.isRequired,
  onSubmitOrder: PropsTypes.func.isRequired,
  disabled: PropsTypes.bool
};

FooterCheckout.defaultProps = {
  disabled: false
};
