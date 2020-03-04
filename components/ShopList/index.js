import React from 'react';
import ProductItem from '../product/ProductItem';

const ShopList = (props) => {
  const { products, numProducts } = props;

  return (
    <>
      <div className="product-list-header">
        <div className="order">
          <p>Ordenar per</p>
        </div>
        <div className="results">
          <p>Resultats:</p>
          <p className="num-results">
            {numProducts}
          </p>
        </div>
        <div className="pagination-div">
          <button className='pagination-arrow'>
            <img src="/icon/left.svg" />
          </button>
          <div className="page-numbers-div">
            <p>1 - 2 - 3 - 4</p>
          </div>
          <button className='pagination-arrow'>
            <img src="/icon/right.svg" />
          </button>
        </div>
      </div>
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
    </>
  );
};

export default ShopList;
