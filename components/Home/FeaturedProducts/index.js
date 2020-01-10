import React from 'react';
import FeaturedList from './FeaturedList';

const FeaturedProducts = (props) => {
  const { imgUrl } = props;
  // console.log('TCL: FeaturedProducts -> imgUrl', imgUrl);

  return (
    <div className="featured-list">
      <h2>Jocs destacats</h2>
      <h5 className="subtitle">Els jocs més venuts i recomenats</h5>
      <FeaturedList imgUrl={imgUrl} />
    </div>
  );
};

export default FeaturedProducts;
