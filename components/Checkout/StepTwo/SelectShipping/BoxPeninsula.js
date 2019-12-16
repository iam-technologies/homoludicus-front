import _ from 'lodash';
import React, { Fragment } from 'react';

import settings from '../../../../settings';
import { dataFormat } from '../../../../utils';
import { RadioInput } from '../../../common';


export default ({ item, onChange, state }) => {
  const peninsulaSettings = settings.shipping.peninsula;
  const amount = _.get(item, 'amount', 0);

  const shippingDiscount = amount < settings.shipping.amountFree;

  const saturdayPrice = shippingDiscount
    ? peninsulaSettings.saturday.price : peninsulaSettings.saturday.priceDiscount;
  const standarPrice = state === 'Madrid'
    ? peninsulaSettings.standard.priceMadrid : peninsulaSettings.standard.price;


  return (
    <Fragment>
      {
        shippingDiscount ? (
          <div className="box_shipping">
            <RadioInput
              active={_.get(item, 'shipping.type', '') === peninsulaSettings.standard.type}
              onChange={onChange}
              path="shipping"
              value={{ type: peninsulaSettings.standard.type, price: standarPrice }}
            >
              <div className="description_shipping">
                <p className="title">
                  <span>Envío estándard</span>
                  <span className="price">{dataFormat.formatCurrency(standarPrice)}</span>
                </p>
                <p className="text">Plazo de entrega estimado de 24 horas (salvo Baleares 48h o sábado y festivos).</p>
              </div>
            </RadioInput>
          </div>
        ) : (
          <div className="box_shipping">
            <RadioInput
              active={_.get(item, 'shipping.type', '') === 'free'}
              onChange={onChange}
              path="shipping"
              value={{ type: 'free', price: 0 }}
            >
              <div className="description_shipping">
                <p className="title">
                  <span>Envío estándard</span>
                  <span className="price">Gratis</span>
                </p>
                <p className="text">Plazo de entrega estimado de 24 horas (salvo Baleares 48h o sábado y festivos).</p>
              </div>
            </RadioInput>
          </div>
        )
      }

      <div className="box_shipping">
        <RadioInput
          active={_.get(item, 'shipping.type', '') === peninsulaSettings.saturday.type}
          onChange={onChange}
          path="shipping"
          value={{ type: peninsulaSettings.saturday.type, price: saturdayPrice }}
        >
          <div className="description_shipping">
            <p className="title">
              <span>Entrega el sábado (sólo en Península)</span>
              <span className="price">
                {dataFormat.formatCurrency(saturdayPrice)}
              </span>
            </p>
            {/* <p className="text">Plazo de entrega garantizado en 24h. Incluídos sábados por la mañana.</p> */}
          </div>
        </RadioInput>
      </div>
    </Fragment>
  );
};
