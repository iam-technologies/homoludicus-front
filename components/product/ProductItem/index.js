import _ from 'lodash';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

import { urlUtils, dataFormat, texts, priceCalc } from '../../../utils';
import { Image, Badge } from '../../common';


const ProductItem = ({ isSearch, item, location, clickCompare, onSelect, onClick, selected }) => {
  const isChecked = selected.indexOf(item._id) !== -1;
  const maxChecked = selected.length >= 3;

  const { img, state, alt } = item;
  const name = _.get(item, 'name.es', '');

  const badgePrice = priceCalc.getBadgePrice(item);
  const oldPrice = priceCalc.showPriceNotOffer(item);
  const textBadge = texts.getStates(state);

  return (
    <div className="relative">
      {
        clickCompare && (
          <span
            className={`icon_check ${isChecked && 'icon_check-checked'} ${maxChecked && !isChecked && 'icon_check-disabled'}`}
            onClick={e => onSelect(e, item._id)}
          />
        )
      }
      <Link
        href={{
          pathname: urlUtils.linkToProduct(location, item)
          // state: { lastLocation: location } // checar
        }}
      >
        <a className={`product_box_ui${isSearch ? '-s_p' : ''}`} onClick={onClick}>
          {
            textBadge || badgePrice ? (
              <Badge
                products
                discount={!!badgePrice}
              >
                {badgePrice || textBadge}
              </Badge>
            ) : null
          }
          <div className="product_box_ui-img">
            {
              img && img.length > 0 ? (
                <Image
                  alt={_.get(alt, '0', name)}
                  src={img[0]}
                />
              ) : ''
            }
          </div>
          <div className="product_box_ui-desc">
            <div className="product_box_ui-title">{name}</div>
            <div className="product_box_ui-price">
              {
                oldPrice && <p className="product_box_ui-old_price">{oldPrice}</p>
              }
              <p
                className={oldPrice ? 'product_box_ui-offer_price' : ''}
              >{dataFormat.formatCurrency(priceCalc.get(item))}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

ProductItem.displayName = 'ProductItem';

export default React.memo(ProductItem);

ProductItem.propTypes = {
  isSearch: PropTypes.bool,
  item: PropTypes.object.isRequired,
  location: PropTypes.string,
  onClick: PropTypes.func,
  clickCompare: PropTypes.bool,
  onSelect: PropTypes.func,
  selected: PropTypes.array
};


ProductItem.defaultProps = {
  isSearch: false,
  location: '',
  onClick: () => { },
  clickCompare: false,
  onSelect: () => { },
  selected: []
};
