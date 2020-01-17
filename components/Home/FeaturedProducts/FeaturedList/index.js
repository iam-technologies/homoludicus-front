import React from 'react';
import ProductItem from '../../../product/ProductItem';

const FeaturedList = (props) => {
  const { products } = props;
  // console.log(products);
  // console.log('location', products[0].mainCategory.url);

  return (
    <div className="featured-list-div">
      {products.map((product) => {
        return (
          <ProductItem
            key={product._id}
            item={product}
            location={product.mainCategory.url}
          />
        );
      })}
    </div>
  );
};

export default FeaturedList;
