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

  const initialValue = '';

  const [inputValue, setInputValue] = useState(initialValue);

  const [categorySelected, setCategory] = useState('todos');

  const [filteredProducts, setProducts] = useState({});

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  async function getData(newUrl) {
    const newData = await api.products.getByCategory(newUrl, {}, (err, res) => {
      return res ? res.data : null;
    });

    setProducts(newData);
  }

  const onSetCategory = (newCategory) => {
    setCategory(newCategory);
    getData(categorySelected);
  };

  // useEffect(() => {
  //   getData(categorySelected);
  // });

  console.log('categorySelected', categorySelected);
  console.log('filteredProducts', filteredProducts);
  // console.log('allproducts', allProducts);

  return (
    <Layout>
      <Carousel items={carouselItems} />
      <SearchByAge generics={generics} />
      <ShopLayout
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        categories={categories}
        onSetCategory={onSetCategory}
        categorySelected={categorySelected}
      >
        <div className="product-list-header">
          <div className="order">
            <p>Ordenar per</p>
          </div>
          <div className="results">
            <p>Resultats:</p>
            {
              !filteredProducts
                ? (
                  <p className="num-results">
                    {allProducts.numProducts}
                  </p>
                )
                : (
                  <p className="num-results">
                    {filteredProducts.numProducts
                    }
                  </p>
                )}
          </div>
          <div className="pagination-div">
            1-2-3
          </div>
        </div>
        <ShopList products={filteredProducts.products || allProducts.products} />
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

  // const newUrl = 'magic-the-gathering';
  // const subCat = categorySelected;
  const options = { limit: 12, skip: 0 };
  // const filters = { 'category.es': 'todos' };

  const allProducts = await api.products.getAll({ options }, (err, res) => {
    return res ? res.data : null;
  });

  // const filteredProducts = await api.products.getByCategory(newUrl, {}, (err, res) => {
  //   return res ? res.data : null;
  // });

  return { content, selection, loaded: true, imgUrl, categories, allProducts, asPath };
};

export default shop;
