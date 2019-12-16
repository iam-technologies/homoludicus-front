import _ from 'lodash';
import React from 'react';
import { Link } from '../../../routes';

import { urlUtils } from '../../../utils';
import { Image } from '../../common';


export default ({ item, onRemove }) => (
  <Link route={urlUtils.linkToProduct('', item)}>
    <a className="favourite_item">
      <div className="favourite_item__img">
        <Image
          alt={_.get(item, 'name.es')}
          src={_.get(item, 'img.0', '')}
        />
      </div>

      <p className="favourite_item__title">
        {_.get(item, 'name.es', '')}
      </p>

      <button
        className="favourite_item__btn-remove"
        onClick={e => onRemove(e, _.get(item, '_id', ''))}
        type="button"
      />
    </a>
  </Link>
);
