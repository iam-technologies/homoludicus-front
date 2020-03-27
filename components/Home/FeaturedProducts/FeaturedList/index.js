import React from 'react';
import ProductItem from '../../../product/ProductItem';

const FeaturedList = (props) => {
  const { products } = props;

  return (
    <div className="featured-list-div">
      {products.map((product) => {
        return (
          <ProductItem
            key={product._id}
            item={product}
          />
        );
      })}
    </div>
  );
};

export default FeaturedList;
