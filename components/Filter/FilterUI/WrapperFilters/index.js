import React from 'react';
import PropTypes from 'prop-types';

import SizeFilter from '../SizeFilter';
import ColorFilter from '../ColorFilter';


const WrapperFilters = ({ attributes, onChange, filters }) => (
  <div className="filter_ui-all_container">
    {
      attributes.map((elem) => {
        switch (elem.type) {
          case 'size': {
            return <SizeFilter onChange={onChange} filters={filters} item={elem} key={elem._id} />;
          }

          case 'color': {
            return <ColorFilter onChange={onChange} filters={filters} item={elem} key={elem._id} />;
          }

          default: return null;
        }
      })
    }
  </div>
);


WrapperFilters.propTypes = {
  attributes: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default WrapperFilters;
