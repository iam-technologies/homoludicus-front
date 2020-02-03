import React, { useState, useEffect } from 'react';
import _get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { api, getImageUrl } from '../../serverServices';
import { Layout } from '../../components';
import SearchByAge from '../../components/SearchByAge';
import CategoryFilter from '../../components/common/CategoryFilter';
import Carousel from '../../components/common/Carousel';
import getGeneric from '../../redux/actions/genericActs';
import ShopLayout from '../../components/common/ShopLayout';

const shop = ({ content, selection, categories }) => {
  const carouselItems = _get(content, 'slider', []);
  const { products } = selection;

  const genericLoad = useSelector(state => state.generic.load);
  const generics = useSelector(state => state.generic.doc);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!genericLoad) {
      dispatch(getGeneric());
    }
  }, []);

  const initialValue = '';

  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <Layout>
      <Carousel items={carouselItems} />
      <SearchByAge generics={generics} />
      <ShopLayout inputValue={inputValue} handleInputChange={handleInputChange} categories={categories}>
        <p>SHOP</p>
        {products.map((product) => {
          return <p key={product._id}>{product._id}</p>;
        })}
      </ShopLayout>


      {/* <div className="shop-page">
        <section className="left-side">
          <CategoryFilter inputValue={inputValue} handleInputChange={handleInputChange} categories={categories} />
        </section>
        <section className="right-side">
          <p>SHOP</p>
          {products.map((product) => {
            return <p key={product._id}>{product._id}</p>;
          })}
        </section>
      </div> */}
    </Layout>
  );
};

shop.getInitialProps = async () => {
  const content = await api.contents.getByKey('home', (err, res) => {
    return res ? res.data : null;
  });
  const imgUrl = await getImageUrl(content);
  const selection = content.selections || [];
  const categories = await api.categories.getAll({ query: { idFather: '0' } }, (err, res) => {
    return res ? res.data : null;
  });

  return { content, selection, loaded: true, imgUrl, categories };
};

export default shop;
