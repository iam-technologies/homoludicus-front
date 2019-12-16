import _ from 'lodash';
import React from 'react';

import { imgServices } from '../../../../serverServices';
import { Image } from '../../../common';

const getItem = (type, key, value, item) => {
  switch (type) {
    case 'text': return <p className="config_text">{key}</p>;

    case 'size': return <p className="config_other">{_.get(value, 'name.es', '')}</p>;
    case 'other': return <p className="config_other">{_.get(value, 'name.es', '')}</p>;

    case 'color': {
      const colorValue = _.get(value, 'properties.colorValue', '');
      const img = _.get(value, 'properties.imgMini', '');
      const style = {
        backgroundColor: colorValue,
        backgroundImage: `url(${img ? imgServices.getUrl(img, 'mobile') : ''})`
      };

      return (
        <p className="config_color">
          {
            img !== '' || colorValue !== '' ? <span className="color" style={style} /> : null
          }
          {_.get(value, 'name.es', '')}
        </p>
      );
    }

    case 'font': {
      return (
        <p className="config_font">
          <Image
            alt={_.get(value, 'name.es', '*')}
            src={_.get(value, 'properties.img', '')}
          />
        </p>
      );
    }

    case 'image': {
      return (
        <p className="config_image">
          <Image
            fitContent
            alt={_.get(item, 'name.es', '*')}
            src={key}
          />
        </p>
      );
    }

    default: return null;
  }
};


export default ({ config }) => {
  const keys = Object.keys(config);
  if (keys.length === 0) return null;

  return (
    <div className="config_product">
      {
        keys.map((elem) => {
          const { item, key, value } = config[elem];

          if (_.get(item, '_id', '') === '') return null;

          const name = _.get(item, 'refProduct', '') === ''
            ? _.get(item, 'name.es', '')
            : `${_.get(item, 'name.es', '')} en ${_.get(item, 'refProduct.name.es', '')}`;

          const type = _.get(item, 'type', '');

          const renderItem = getItem(type, key, value, item);

          return (
            <div key={elem} className="config_item">
              <p className="config_title">{name}:</p>
              {
                renderItem
              }
            </div>
          );
        })
      }
    </div>
  );
};
