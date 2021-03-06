import React, { Fragment, useEffect, useState } from 'react';
import _get from 'lodash/get';
import Link from 'next/link';
import { withWindowResize } from '../hoc';
import Carousel from '../common/Carousel';
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
  const desc = _get(selection, 'desc.es', '');
  const products = _get(selection, 'products', []);
  const seoHeading = _get(content, 'seoHeading.es', '');
  const seoText = _get(content, 'seoText.es', '');

  const mode = process.env.NODE_ENV;

  return (
    <section className={`app-home animation_opacity${show ? '-remove' : ''}`}>
      <Carousel items={carouselItems} />
      {mode}
      <div className="middle-page-div">
        <FeaturedEvents />
        <FeaturedProducts products={products} />
        <div className="see-more-button-div">
          <Link href="/shop/todos/">
            <button className="button-yellow">
              Veure tot
            </button>
          </Link>
        </div>
      </div>
      <ServicesHome />
      {/* <ScheduleHome /> */}
      <div className="app-home-info app-home-more_info">
        <div dangerouslySetInnerHTML={{ __html: seoHeading }} />
        <div dangerouslySetInnerHTML={{ __html: seoText }} />
      </div>
    </section>
  );
};


export default withWindowResize(Home);
