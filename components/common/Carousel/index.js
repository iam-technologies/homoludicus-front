import _get from 'lodash/get';
import ImageGallery from 'react-image-gallery';
import React from 'react';
import Link from 'next/link';

import { imgServices } from '../../../serverServices';
import { urlUtils } from '../../../utils';

const Carousel = ({ items }) => {
  const getSlide = (elem) => {
    const imgUrl = _get(elem, 'img.attachment', '');
    // const imgUrl = items[0]
    const btnText = _get(elem, 'btnText.es', '');
    const linkUrl = _get(elem, 'linkUrl', '');
    const titleImg = _get(elem, 'title.es', '');
    const subtitleImg = _get(elem, 'subtitle.es', '');
    const link = linkUrl ? urlUtils.urlToPathLink(linkUrl) : '';

    if (!imgUrl) return null;
    const imgPath = imgUrl.split('.');
    const imgFormat = imgPath.pop();
    const imgFallback = `${imgPath.join('.')}.jpg`;

    return (
      <div className="carousel_home">
        <picture>
          {imgFormat === 'webp' && <source srcSet={imgServices.getUrl(imgUrl)} type="image/webp" />}
          <img src={imgServices.getHomeUrl(imgFallback)} alt={imgUrl} />
        </picture>
        <h1>{titleImg}</h1>
        <h5>{subtitleImg}</h5>
        {
          (link && btnText)
          && (
            <Link href="/[entity]" as={link}>
              <a className="carousel_btn">{btnText}</a>
            </Link>
          )
        }
      </div>
    );
  };

  if (items.length < 1) return null;

  const images = items.map(elem => ({ renderItem: () => getSlide(elem) }));


  return (
    <ImageGallery
      autoPlay
      disableArrowKeys
      items={images}
      showFullscreenButton={false}
      showNav={false}
      showPlayButton={false}
      showThumbnails={false}
      slideDuration={1200}
      slideInterval={6000}
      useTranslate3D={false}
      showBullets
    />
  );
};

export default Carousel;
