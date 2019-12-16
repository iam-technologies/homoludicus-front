import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { dataFormat } from '../../../../utils';
import { RadioInput } from '../../../common';


const SizeFilter = ({ item, filters, onChange }) => (
  <div className="filter_ui-size">
    <p className="filter_ui-title">{_.get(item, 'name.es', '')}:</p>

    <div className="content">
      {
        item.values.map((el, i) => {
          const elem = dataFormat.getDefaultProperties(el, item);

          const key = _.get(elem, 'key', '');

          return (
            <RadioInput
              key={item._id + i.toString()}
              active={key === _.get(filters, item._id, '')}
              onChange={onChange}
              path={`attributes.${item._id}`}
              value={key}
            >
              {_.get(elem, 'name.es', '')}
            </RadioInput>
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
