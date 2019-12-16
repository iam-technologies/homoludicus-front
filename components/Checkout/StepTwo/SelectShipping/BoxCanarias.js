import _ from 'lodash';
import React, { Fragment } from 'react';

import settings from '../../../../settings';
import { dataFormat } from '../../../../utils';
import { RadioInput } from '../../../common';


export default ({ item, onChange }) => (
  <Fragment>
    <div className="box_shipping">
      <RadioInput
        active={_.get(item, 'shipping.type', '') === settings.shipping.canarias.standard.type}
        onChange={onChange}
        path="shipping"
        value={{
          type: settings.shipping.canarias.standard.type,
          price: settings.shipping.canarias.standard.price
        }}
      >
        <div className="description_shipping">
          <p className="title">
            <span>Envío estándard</span>
            <span className="price">
              {dataFormat.formatCurrency(settings.shipping.canarias.standard.price)}
            </span>
          </p>
          <p className="text">Plazo de entrega estimado 7-10 días</p>
        </div>
      </RadioInput>
    </div>

    <div className="box_shipping">
      <RadioInput
        active={_.get(item, 'shipping.type', '') === settings.shipping.canarias.fast.type}
        onChange={onChange}
        path="shipping"
        value={{
          type: settings.shipping.canarias.fast.type,
          price: settings.shipping.canarias.fast.price
        }}
      >
        <div className="description_shipping">
          <p className="title">
            <span>Envío rápido</span>
            <span className="price">
              {dataFormat.formatCurrency(settings.shipping.canarias.fast.price)}
            </span>
          </p>
          <p className="text">Plazo de entrega estimado 3 días laborales</p>
        </div>
      </RadioInput>
    </div>
  </Fragment>
);
