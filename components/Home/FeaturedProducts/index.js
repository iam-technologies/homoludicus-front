import React from 'react';
import FeaturedList from './FeaturedList';

const FeaturedProducts = () => {
  return (
    <div className="featured-list">
      <h2>Jocs destacats</h2>
      <h5>Els jocs més venuts i recomenats</h5>
      <FeaturedList />
    </div>
  );
};

export default FeaturedProducts;
