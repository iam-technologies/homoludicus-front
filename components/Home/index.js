import React, { Fragment, useEffect, useState } from 'react';
import _get from 'lodash/get';
import { withWindowResize } from '../hoc';
import Carousel from './Carousel';
import { MobileHeader } from '../common';
import FeaturedEvents from './FeaturedEvents';
import FeaturedProducts from './FeaturedProducts';
import ServicesHome from './ServicesHome';
import ScheduleHome from './ScheduleHome';

const Home = ({ content, selection, imgUrl = '', loaded, screen = 'm' }) => {
  const [show, setshow] = useState(false);

  useEffect(() => {
    setshow(loaded);
  }, [loaded]);

  const carouselItems = _get(content, 'slider', []);
  console.log("TCL: Home -> content", content)
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
      <div className="middle-page-div">
        {/* events */}
        <FeaturedEvents />
        {/* featured */}
        <FeaturedProducts products={products} />
      </div>
      <ServicesHome />
      <ScheduleHome />
    </section>
  );
};


export default withWindowResize(Home);
