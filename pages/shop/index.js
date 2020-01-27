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

shop.getInitialProps = async () => {
  const content = await api.contents.getByKey('home', (err, res) => {
    return res ? res.data : null;
  });
  const imgUrl = await getImageUrl(content);
  const selection = content.selections || [];

  return { content, selection, loaded: true, imgUrl };
};

export default shop;
