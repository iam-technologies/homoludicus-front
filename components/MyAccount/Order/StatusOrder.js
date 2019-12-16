import _ from 'lodash';
import moment from 'moment';
import React from 'react';

import { texts, orderUtils } from '../../../utils';
import { Badge } from '../../common';


export default ({ item }) => {
  const status = [..._.get(item, 'status', [])].reverse();

  return (
    <div className="bg_my_order status_order">
      <p className="title_status">Estado del pedido</p>

      <div className="status_order_list">
        {
          status.map((elem, i) => {
            const { name, date } = elem;
            if (name === 'waitPaymentPayPal') return null;
            if (name === 'waitPaymentStripe') return null;

            return (
              <div className="status_item" key={name + i.toString()}>
                <div className="cell_status cell_left">
                  { moment(date).format('DD-MM-YYYY') }
                </div>

                <div className="cell_status cell_center">
                  <Badge order className={name}>
                    { texts.get('orders', name) }
                  </Badge>
                </div>

                <div className="cell_status cell_right">
                  { orderUtils.msgStatus(name, item) }
                </div>
              </div>
            );
          })
        }
      </div>

    </div>
  );
};
