import React from 'react';
import FeaturedList from './FeaturedList';

const FeaturedProducts = (props) => {
  const { products } = props;

  return (
    <div className="featured-list">
      <div className="featured-list-titles">
        <h2>Jocs destacats</h2>
        <h5 className="subtitle">Els jocs més venuts i recomenats</h5>
      </div>
      <FeaturedList products={products} />
    </div>
  );
};

export default FeaturedProducts;

