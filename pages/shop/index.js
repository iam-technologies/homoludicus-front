import React, { useEffect } from 'react';
import _get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { api, getImageUrl } from '../../serverServices';
import { Layout } from '../../components';
import SearchByAge from '../../components/SearchByAge';
import CategoryFilter from '../../components/common/CategoryFilter';
import Carousel from '../../components/common/Carousel';
import getGeneric from '../../redux/actions/genericActs';

const shop = ({ content }) => {

  const carouselItems = _get(content, 'slider', [])

  const genericLoad = useSelector(state => state.generic.load);
  const products = useSelector(state => state.generic.doc);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!genericLoad) {
      dispatch(getGeneric());
    }
  }, [genericLoad]);

  return (
    <Layout>
      <Carousel items={carouselItems} />
      <div className="shop-page">
        <section className="left-side">
          <CategoryFilter />
        </section>
        <section className="right-side">
          <SearchByAge products={products} />
          <p>SHOP</p>
          {/* {products.map((product) => {
            return <p key={product._id}>{product._id}</p>;
          })} */}
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

  return { content, loaded: true, imgUrl };
};

export default shop;
