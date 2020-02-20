import React from 'react';
import ProductItem from '../product/ProductItem';

const ShopList = (props) => {
  const { products } = props;

  return (
      <section className="shop-product_list_ui">
          {products.map((product) => {
              return (
                  <ProductItem
                      key={product._id}
                      item={product}
                      location={product.mainCategory.url}
                    />
              );
            })}
        </section>
  );
};

export default ShopList;
