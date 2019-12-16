import React from 'react';
import PropTypes from 'prop-types';

import ProductItem from '../ProductItem';


const ProductList = ({ items = [], title, location, clickCompare, onSelect, selected }) => {
  return (
    <section className="product_list_ui">
      {
      title && <div className="product_list_ui-title">{title}</div>
    }

      <div className="product_list_ui-container">
        {
        items && items.map(item => (
          <ProductItem
            item={item}
            key={item._id}
            location={location}
            clickCompare={clickCompare}
            onSelect={onSelect}
            selected={selected}
          />
        ))
      }
      </div>
    </section>
  );
};


ProductList.propTypes = {
  items: PropTypes.array.isRequired,
  location: PropTypes.string,
  title: PropTypes.string
};

ProductList.defaultProps = {
  title: '',
  location: ''
};

export default ProductList;
