import React from 'react';
import _get from 'lodash/get';
import { api, getImageUrl } from '../../serverServices';
import { Layout } from '../../components';
import SearchByAge from '../../components/SearchByAge';
import CategoryFilter from '../../components/common/CategoryFilter';
import Carousel from '../../components/common/Carousel';

const shop = ({ selection, content }) => {
  const { products } = selection;

  const carouselItems = _get(content, 'slider', []);
  console.log(products);
  return (
    <Layout>
      <Carousel items={carouselItems} />
      <div className="shop-page">
        <section className="left-side">
          <CategoryFilter />
        </section>
        <section className="right-side">
          <SearchByAge />
          <p>SHOP</p>
          {products.map((product) => {
            return <p key={product._id}>{product._id}</p>;
          })}
        </section>
      </div>
    </Layout>
  );
};

export default shop;
