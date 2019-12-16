import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import Loader from 'react-loaders';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { cartsActs } from '../../../../../redux/actions';
import { api } from '../../../../../serverServices';
import { msgUI } from '../../../../../utils';
import { validateStep } from '../../../helpers';
import { ButtonInput } from '../../../../common';


class WireTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
    this.onCart = bindActionCreators(cartsActs, props.dispatch);
    this.onSubmit = this.onSubmit.bind(this);
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
          this.submitOrders(res);
        }
      });
    }
  }

  submitOrders(item) {
    const { onSubmitOrder } = this.props;

    api.orders.upsert({ item }, '', (err, res) => {
      if (err) {
        let msg = msgUI.getText(`order_validation.${err.type}`);

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
        onSubmitOrder('wireTransfer', res.data);
      }
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="btn_submit_buy">
        <ButtonInput
          label={loading ? <Loader type="ball-beat" color="#FFFFFF" /> : 'CONFIRMAR COMPRA'}
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}

WireTransfer.propTypes = {
  item: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitOrder: PropTypes.func.isRequired
};

export default connect()(WireTransfer);
