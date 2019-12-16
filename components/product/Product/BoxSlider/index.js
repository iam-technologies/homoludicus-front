import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { texts, priceCalc } from '../../../../utils';
import { Image, Badge } from '../../../common';


const BoxSlider = ({ images, badge, imgAttr, item }) => {
  const productName = _.get(item, 'name.es', '');
  const alt = _.get(item, 'alt', []);

  const renderImages = images.map((elem, index) => {
    const imgAlt = alt[index] || productName;
    
    return {
    renderItem: () => (<Image src={elem} alt={imgAlt} className="img_slider" />),
    bulletClass: 'a_p-box_slider_bullets'
  }});

  const badgePrice = priceCalc.getBadgePrice(item);
  const textBadge = texts.getStates(badge);

  return (
    <div className="a_p-box_slider">
      <div className={`a_p-box_slider-img_attr ${imgAttr ? 'show-img' : ''}`}>
        {
          imgAttr ? <Image src={imgAttr} /> : null
        }
      </div>
      {
        images.length < 1 ? null : (
          <React.Fragment>
            {
              textBadge !== ''
                ? (<div className="a_p-box_slider_badge">{textBadge}</div>)
                : null
            }

            {
              badgePrice && (
                <Badge
                  products
                  className="a_p-box_slider-offer"
                  discount={!!badgePrice}
                >
                  {badgePrice}
                </Badge>
              )
            }

            <ImageGallery
              autoPlay
              disableArrowKeys
              items={renderImages}
              showNav={false}
              showBullets
              showPlayButton={false}
              showThumbnails={false}
              slideDuration={1200}
              slideInterval={6000}
              useTranslate3D={false}
            />
          </React.Fragment>
        )
      }
    </div>
  );
};


BoxSlider.propTypes = {
  badge: PropTypes.string,
  images: PropTypes.array,
  imgAttr: PropTypes.string,
  item: PropTypes.object.isRequired
};

BoxSlider.defaultProps = {
  badge: '',
  images: [],
  imgAttr: ''
};


export default connect(state => ({ imgAttr: state.showImgAttribute.value }))(BoxSlider);
