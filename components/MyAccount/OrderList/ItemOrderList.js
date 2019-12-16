import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { Link } from '../../../routes';

import { dataFormat, texts } from '../../../utils';
import { Badge } from '../../common';


export default ({ item, onClickBill }) => {
  const status = _.get(item, 'status', []);
  const statusName = _.get(status, `${status.length - 1}.name`, '');
  const orderNumber = _.get(item, '_id', '').slice(-8);
  const billUrl = _.get(item, 'bill.url', '');

  return (
    <Link route={`/orders/${item._id}`}>
      <a className="orders_item">
        <p className="cell">{orderNumber}</p>

        <p className="cell">{moment(_.get(item, 'createAt', '')).format('DD-MM-YYYY')}</p>

        <p className="cell price">{dataFormat.formatCurrency(_.get(item, 'amountTotal', 0))}</p>

        <div className="cell cell_status">
          <Badge
            order
            className={statusName}
          >
            {texts.get('orders', statusName)}
          </Badge>
        </div>

        <p className="cell">
          {
            billUrl && (
              <button
                className="link_bill"
                type="button"
                onClick={e => onClickBill(e, billUrl)}
              >Descargar
              </button>
            )
          }
        </p>
      </a>
    </Link>
  );
};
