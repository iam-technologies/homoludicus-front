import _ from 'lodash';
import React from 'react';

import { Image, ButtonInput } from '../../../common';
import PackConfig from './PackConfig';
import ConfigProduct from './ConfigProduct';
import { checkStatusOk } from '../../../../utils/orderUtils/statusOk';


export default ({ product, config, status, onClick, indexOrder, ratingId }) => {
  const name = _.get(product, 'name.es', '');
  const checkStatus = checkStatusOk(status);

  const editRanting = { ...product, indexOrder, ratingId };

  return (
    <div className="bg_my_order main_order">
      <div className="img_product">
        <Image
          fitContent
          alt={name}
          src={_.get(product, 'img.0', '')}
        />
      </div>

      <div className="info_product">
        {
          checkStatus && (
            <div
              className="ratings_edit"
            >
              <ButtonInput
                key={ratingId || 'onRating'}
                className="ratings_edit-btn"
                onClick={() => onClick(editRanting)}
                label={ratingId ? 'Cambiar valoración' : 'Escribir valoración'}
              />
            </div>
          )
        }

        <p className="title_product">{name}</p>
        <p className="short_description">{_.get(product, 'shortDesc.es', '')}</p>

        <PackConfig product={product} config={config} />

        <ConfigProduct config={config} />
      </div>
    </div>
  );
};
