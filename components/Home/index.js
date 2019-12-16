import React, { Fragment, useEffect, useState } from 'react';
import _get from 'lodash/get';

import ProductList from '../product/ProductList';
// import { api, getImageUrl } from '../../serverServices';
import { withWindowResize } from '../hoc';
import Carousel from './Carousel';
import { MobileHeader, Instagram } from '../common';
import Grid from './Grid';
import PriceSlider from './PriceSlider';

const Home = ({ content, selection, imgUrl = '', loaded, screen = 'm' }) => {
  const [show, setshow] = useState(false);

  useEffect(() => {
    setshow(loaded);
  }, [loaded]);

  const carouselItems = _get(content, 'slider', []);
  const grid = _get(content, 'grid', []);
  const desc = _get(selection, 'desc.es', '');
  const products = _get(selection, 'products', []);
  const seoHeading = _get(content, 'seoHeading.es', '');
  const seoText = _get(content, 'seoText.es', '');

  return (
    <section className={`app-home animation_opacity${show ? '-remove' : ''}`}>
      <MobileHeader home logo />
      {
        (screen === 'xs') ? <div className="app-home_hero" style={{ backgroundImage: `url(${imgUrl})` }} />
          : <Carousel items={carouselItems} />
      }
      <PriceSlider />
      <Grid items={grid} />
      {screen !== 'xs' && (
        <Fragment>
          <ProductList title={desc} items={products} />
          <Instagram />
          <div className="app-home-info app-home-more_info">
            <div dangerouslySetInnerHTML={{ __html: seoHeading }} />
            <div dangerouslySetInnerHTML={{ __html: seoText }} />
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default withWindowResize(Home);
