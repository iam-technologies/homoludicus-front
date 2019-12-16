import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { RadioInput, TextArea } from '../../common';
import Payment from './Payment';
import FormBusiness from './FormBusiness';

export default class StepThree extends Component {
  constructor(props) {
    super(props);

    this.onChange = props.onChange.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onChangeSelect(path, value) {
    this.props.onChange(path, !value);
  }

  render() {
    const { item, errors, onSubmitOrder, user } = this.props;
    const paymentType = _.get(item, 'paymentType', '');

    return (
      <div className="step_payment">
        <div className="check_type_buy">
          <p className="title">¿Necesitas factura para este pedido?</p>

          <RadioInput
            active={paymentType === 'particular'}
            className="type_user first"
            onChange={this.onChange}
            path="paymentType"
            value="particular"
          > No, soy particular y con el ticket de compra es suficiente.
          </RadioInput>

          <RadioInput
            active={paymentType === 'business'}
            className="type_user"
            onChange={this.onChange}
            path="paymentType"
            value="business"
          > Sí, soy empresa o autónomo y quiero factura.
          </RadioInput>
        </div>

        <TextArea
          hintLabel="Escribe aquí tú comentario..."
          label="¿Deseas añadir algún comentario adicional antes de confirmar tu pedido?"
          maxWidth
          onChange={this.onChange}
          path="comment"
          value={_.get(item, 'comment', '')}
        />

        {
          paymentType === 'business'
          && <FormBusiness
            errors={errors}
            item={item}
            onChange={this.onChange}
            user={user}
          />
        }

        {
          paymentType !== ''
          && <Fragment>

            <Payment
              errors={errors}
              item={item}
              onChange={this.onChange}
              onSubmitOrder={onSubmitOrder}
              onTermsChange={this.onChangeSelect}

            />
          </Fragment>
        }

      </div>
    );
  }
}


StepThree.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object).isRequired,
  item: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitOrder: PropTypes.func.isRequired
};
