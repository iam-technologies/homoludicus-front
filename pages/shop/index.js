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

  const [filters, setFilters] = useState({});

  const [filteredProducts, setProducts] = useState(allProducts);

  const defaultOptions = { limit: 12, skip: 0 };
  const [options, setOptions] = useState(defaultOptions);

  // const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  async function getData(newUrl) {
    const newData = await api.products.getByCategory(newUrl, { options, filters }, (err, res) => {
      return res ? res.data : null;
    });
    console.log('TCL: getData -> options', options);

    setProducts(newData);
    console.log('products getdata', filteredProducts);
  }

  const onSetCategory = (newCategory) => {
    setCategory(newCategory);
    getData(categorySelected);
  };

  const onSetAge = (newAge) => {
    const ageQuery = newAge.replace('+', 'mas');
    setFilters({ age: ageQuery });
    getData(categorySelected);
  };

  const onSetHability = (newHability) => {
    setFilters({ ...filters, productTags: newHability });
    console.log(filters);
  };

  const onDeleteFilter = (filter) => {
    if (filter === 'age') {
      delete filters.age;
    } else if (filter === 'hability') {
      delete filters.productTags;
    }
    getData(categorySelected);
  };


  console.log('filters ', filters);
  useEffect(() => {
    getData(categorySelected);
  }, [categorySelected, options, filters]);

  const productList = filteredProducts.products;
  const numProducts = filteredProducts.numProducts;

  console.log('filteredProducts', filteredProducts.products);
  return (
    <Layout>
      <Carousel items={carouselItems} />
      <SearchByAge generics={generics} onSetAge={onSetAge} onDeleteFilter={onDeleteFilter} />
      <ShopLayout
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        categories={categories}
        onSetCategory={onSetCategory}
        categorySelected={categorySelected}
        generics={generics}
        onSetHability={onSetHability}
        onSetAge={onSetAge}
        onDeleteFilter={onDeleteFilter}
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
