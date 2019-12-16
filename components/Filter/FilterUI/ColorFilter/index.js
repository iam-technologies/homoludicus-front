import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { imgServices } from '../../../../serverServices';
import { dataFormat } from '../../../../utils';


const SizeFilter = ({ item, filters, onChange }) => (
  <div className="filter_ui-color">
    <p className="filter_ui-title">{_.get(item, 'name.es', '')}:</p>

    <div className="content">
      {
        item.values.map((el, i) => {
          const elem = dataFormat.getDefaultProperties(el, item);

          const key = _.get(elem, 'key', '');

          const className = `type_color ${key === _.get(filters, item._id, '') ? 'checked' : ''}`;

          const colorValue = _.get(elem, 'properties.colorValue', '');
          const img = _.get(elem, 'properties.imgMini', '');
          const style = {
            backgroundColor: colorValue,
            backgroundImage: `url(${img ? imgServices.getUrl(img, 'mobile') : ''})`
          };

          return (
            <div className={className} key={item._id + i.toString()} >
              {
                colorValue !== '' || img !== '' ? (
                  <div
                    className="type_color-circle"
                    onClick={() => onChange(`attributes.${item._id}`, key)}
                    style={style}
                  />
                ) : (
                  <p
                    onClick={() => onChange(`attributes.${item._id}`, key)}
                    className="text_color"
                  >
                    {_.get(elem, 'name.es', '')}
                  </p>
                )
              }
            </div>
          );
        })
      }
    </div>
  </div>
);


SizeFilter.propTypes = {
  item: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SizeFilter;
