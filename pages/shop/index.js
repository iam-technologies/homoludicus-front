import React, { useState, useEffect } from 'react';
import _get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { api, getImageUrl } from '../../serverServices';
import { Layout } from '../../components';
import SearchByAge from '../../components/SearchByAge';
import Carousel from '../../components/common/Carousel';
import getGeneric from '../../redux/actions/genericActs';
import ShopLayout from '../../components/common/ShopLayout';

const shop = ({ content, selection, categories, allProducts }) => {
  const carouselItems = _get(content, 'slider', []);
  const { products } = selection;

  const genericLoad = useSelector(state => state.generic.load);
  const generics = useSelector(state => state.generic.doc);

  const dispatch = useDispatch();
  console.log('allproducts', allProducts)
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
        {allProducts.products.map((product) => {
          return <div key={product.name.es}>{product.name.es}</div>;
        })}
      </ShopLayout>
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

  const allProducts = await api.products.getAll({}, (err, res) => {
    return res ? res.data : null;
  });


  return { content, selection, loaded: true, imgUrl, categories, allProducts };
};

export default shop;
