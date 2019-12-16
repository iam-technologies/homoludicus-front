import _ from 'lodash';
import React, { PureComponent } from 'react';
import Router from 'next/router'

import { Link } from '../../routes';
//import Name from './Name';
import { withWindowResize } from '../hoc';
import { MobileHeader, Image, Badge, ButtonInput } from '../common';
import { dataFormat, texts, priceCalc, urlUtils } from '../../utils';

class CompareProducts extends PureComponent {
  
  goBack = e => {
    Router.push('/');
  };

  render() {
    const { /* location, */ screen, selectedItems, catName } = this.props;
    // const { selectedItems, catName } = location.state;
    const title = `Comparador de ${catName}`;
    return (
      <section className="app-compare">

        <MobileHeader
          green
          text={title}
        />

        <div className="app-compare-info">
          {
            screen === 'lg' && (
              <h1 className="app-compare-title-h1">{title}</h1>
            )
          }
          <ButtonInput
            label="CERRAR COMPARATIVA"
            onClick={this.goBack}
            icon="../../static/images/icon_compare.png"
          />
        </div>

        <div className="product_list_ui">
          <div className="product_list_ui-container">
            {
              selectedItems && selectedItems.map((item) => {
                const { img, state } = item;
                const name = _.get(item, 'name.es', '');
                const badgePrice = priceCalc.getBadgePrice(item);
                const oldPrice = priceCalc.showPriceNotOffer(item);
                const textBadge = texts.getStates(state);
                const productsPack = _.get(item, 'productsPack');

                const details = _.get(item, 'longDesc.es', '');
                const detailsHtml = details[0] === '<' ? details : details.replace(/\n/g, '<br/>');

                return (
                  <div
                    className="product_box_ui"
                    key={item._id}
                  >
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
                            alt={_.get(item, 'alt.0', name)}
                            src={img[0]}
                          />
                        ) : ''
                      }
                    </div>
      
                    <div className="product_box_ui-desc">
                      <div className="product_box_ui-header">
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

                      <hr className="product_box_ui-divider" />

                      <div className="product_box_ui-pack">
                        <div dangerouslySetInnerHTML={{ __html: detailsHtml }} />
                        {/* <ul>
                          {
                            productsPack && productsPack.map(id => <Name key={id} id={id} />)
                          }
                        </ul> */}
                      </div>
                    </div>
                    <Link route={{ pathname: urlUtils.linkToProduct('', item) }}>
                      <a>
                        <ButtonInput
                          label="AÑADIR AL CARRITO"
                          onClick={() => {}}
                        />
                      </a>
                    </Link>
                  </div>
                );
              })
            }
          </div>
        </div>
      </section>
    );
  }
}

export default withWindowResize(CompareProducts);
