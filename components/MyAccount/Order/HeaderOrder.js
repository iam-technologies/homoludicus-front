import _ from 'lodash';
import moment from 'moment';
import React from 'react';

import { dataFormat, texts } from '../../../utils';
import { Badge } from '../../common';


export default ({ item }) => {
  const status = _.get(item, 'status', []);
  const statusName = _.get(status, `${status.length - 1}.name`, '');
  const orderNumber = _.get(item, '_id', '').slice(-8);
  const billUrl = _.get(item, 'bill.url', '');


  return (
    <div className="bg_my_order header_order">
      <p className="cell">{orderNumber}</p>

      <p className="cell">{moment(_.get(item, 'createAt', '')).format('DD-MM-YYYY')}</p>

      <p className="cell price">
        Total: {dataFormat.formatCurrency(_.get(item, 'amountTotal', 0))}
        <br />
        Gastos envío: {dataFormat.formatCurrency(_.get(item, 'shipping.price', 0))}
      </p>

      <div className="cell cell_status">
        <Badge
          order
          className={statusName}
        >
          {texts.get('orders', statusName)}
        </Badge>
      </div>

      <p className="cell cell_bill">
        {
          billUrl && (
            <a
              className="link_bill"
              href={billUrl}
              target="_blank"
              rel="noopener noreferrer"
            >Descargar Factura
            </a>
          )
        }
      </p>
    </div>
  );
};
