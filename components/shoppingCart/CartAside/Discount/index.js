import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-loaders';
import React, { PureComponent } from 'react';

import { api } from '../../../../serverServices';
import { msgUI, checkFields } from '../../../../utils';
import { cartsActs } from '../../../../redux/actions';
import { TextInput, ButtonInput } from '../../../common';


class Discount extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showCode: _.get(props.item, 'discount.code', '') !== '',
      discount: _.get(props.item, 'discount.code', ''),
      errors: [],
      loading: false
    };

    this.onCart = bindActionCreators(cartsActs, props.dispatch);

    this.onClickCode = this.onClickCode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.onCart.removeDiscount();
  }

  onClickCode() {
    const { showCode } = this.state;

    this.setState({ showCode: !showCode });
  }

  onChange(path, value) {
    let { errors } = this.state;

    if (errors.length > 0) {
      errors = [];
    }

    this.setState({ [path]: value, errors });
  }

  onSubmit() {
    const { discount, loading } = this.state;

    if (loading) return;
    const errors = [...checkFields.isRequired(discount, 'discount')];
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    this.setState({ loading: true });

    api.discounts.getByCode(discount, (error, res) => {
      if (res) {
        this.setState({ errors: [], loading: false });

        this.onCart.addDiscount(res.data);
      } else {
        this.setState({ errors: error.data || [], loading: false });
        this.onCart.removeDiscount();
      }
    });
  }


  render() {
    const { showCode, discount, errors, loading } = this.state;


    return (
      <div className="app_cart_aside-discount">
        <div className="header">
          <p
            className="text"
            onClick={this.onClickCode}
          >¿Tienes un código de descuento?
          </p>
          <button
            type="button"
            className={`btn_code ${showCode ? 'show' : ''}`}
            onClick={this.onClickCode}
          >
            <img src="../../../static/images/icon_down.png" alt="Descuento" />
          </button>
        </div>

        <div className={`input_code ${showCode ? 'show' : ''}`}>
          <div className="flex_input">
            <TextInput
              className="discount-input"
              error={msgUI.get(errors, 'discount')}
              hintLabel="Introduce el código aquí..."
              onChange={this.onChange}
              path="discount"
              value={discount}
            />
            <ButtonInput
              onClick={this.onSubmit}
              label={loading ? <Loader type="ball-beat" color="#FFFFFF" /> : 'APLICAR'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Discount);
