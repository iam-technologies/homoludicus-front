import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import _get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';
import { api, getImageUrl } from '../../serverServices';
import { Layout } from '../../components';
import SearchByAge from '../../components/SearchByAge';
import Carousel from '../../components/common/Carousel';
import getGeneric from '../../redux/actions/genericActs';
import ShopLayout from '../../components/common/ShopLayout';
import ShopList from '../../components/ShopList';
import BonusSection from '../../components/BonusSection';

const shop = ({ content, selection, categories, allProducts, asPath }) => {
  const carouselItems = _get(content, 'slider', []);
  const genericLoad = useSelector(state => state.generic.load);
  const generics = useSelector(state => state.generic.doc);

  const router = useRouter();

  const dispatch = useDispatch();

  // console.log('asPath', asPath);

  useEffect(() => {
    if (!genericLoad) {
      dispatch(getGeneric());
    }
  }, []);

  // searchBar
  const initialValue = '';
  const [inputValue, setInputValue] = useState(initialValue);

  const [categorySelected, setCategory] = useState('todos');

  const [age, setAge] = useState('');

  const [filteredProducts, setProducts] = useState({});

  const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  async function getData(newUrl, options) {
    const newData = await api.products.getByCategory(newUrl, { options }, (err, res) => {
      return res ? res.data : null;
    });

    setProducts(newData);
  }

  const onSetCategory = (newCategory) => {
    setCategory(newCategory);
    const options = { limit: 12, skip: 0 };
    getData(categorySelected, options);
  };

  const onSetAge = (newAge) => {
    setAge(newAge);
    const ageQuery = newAge.replace('+', 'mas');
    console.log(ageQuery);
    const options = { age: ageQuery, limit: 12, skip: 0 };
    getData(categorySelected, options);
  };

  useEffect(() => {
    getData(categorySelected);
  }, [categorySelected, age]);

  const productList = filteredProducts.products || allProducts.products;
  const numProducts = !filteredProducts ? allProducts.numProducts : filteredProducts.numProducts;

  console.log('filteredProducts', filteredProducts.products);

  return (
    <Layout>
      <Carousel items={carouselItems} />
      <SearchByAge generics={generics} onSetAge={onSetAge} />
      <ShopLayout
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        categories={categories}
        onSetCategory={onSetCategory}
        categorySelected={categorySelected}
      >
        <ShopList products={productList} numProducts={numProducts} />
        <BonusSection />
      </ShopLayout>
    </Layout>
  );
};

shop.getInitialProps = async ({ asPath }) => {
  const content = await api.contents.getByKey('home', (err, res) => {
    return res ? res.data : null;
  });
  const imgUrl = await getImageUrl(content);
  const selection = content.selections || [];
  const categories = await api.categories.getAll({ query: { idFather: '0' } }, (err, res) => {
    return res ? res.data : null;
  });

  const options = { limit: 12, skip: 0 };

  const allProducts = await api.products.getAll({ options }, (err, res) => {
    return res ? res.data : null;
  });

  return {
    content,
    selection,
    loaded: true,
    imgUrl,
    categories,
    allProducts,
    asPath
  };
};

export default shop;
