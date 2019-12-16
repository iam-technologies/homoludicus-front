import _get from 'lodash/get';
import ImageGallery from 'react-image-gallery';
import React from 'react';
import { Link } from '../../../routes';

import { imgServices } from '../../../serverServices';
import { urlUtils } from '../../../utils';

const Carousel = ({ items }) => {
  const getSlide = (elem) => {
    const imgUrl = _get(elem, 'imgUrl', '');
    const btnText = _get(elem, 'btnText.es', '');
    const linkUrl = _get(elem, 'linkUrl', '');

    const link = linkUrl ? urlUtils.urlToPathLink(linkUrl) : '';

    if (!imgUrl) return null;
    const imgPath = imgUrl.split('.');
    const imgFormat = imgPath.pop();
    const imgFallback = `${imgPath.join('.')}.jpg`;

    return (
      <div className="carousel_home">
        <picture>
          {imgFormat == 'webp' && <source srcSet={imgServices.getUrl(imgUrl)} type="image/webp" />}
          <img src={imgServices.getUrl(imgFallback)} alt={imgUrl} />
        </picture>
        {
          (link && btnText)
          && (
          <Link route={link}>
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
    />
  );
};

export default Carousel;
