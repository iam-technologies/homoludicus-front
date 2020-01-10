import _ from 'lodash';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import React from 'react';
// import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import Router from 'next/router';
import { api } from '../../../serverServices';
// import { urlUtils } from '../../../utils';
import { MobileHeader } from '../../common';
import BoxSlider from './BoxSlider';
import BoxBuyProduct from './BoxBuyProduct';
import BoxDetails from './BoxDetails';
import BoxRatings from './BoxRatings';
import RelatedProduct from './RelatedProduct';
import InfoSwitcher from './InfoSwitcher';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      product: {},
      refundsText: ''
    };

    this.getItems = this.getItems.bind(this);
    this.getRefundsText = this.getRefundsText.bind(this);
  }

  componentDidMount() {
    this.getItems();
    this.getRefundsText();
  }

  // componentDidUpdate(prevProps) {
  //   const { location } = this.props;

  //   if (prevProps.location.pathname !== location.pathname) {
  //     this.setState({ loaded: false });

  //     this.getItems();
  //   }
  // }

  getItems() {
    // const { history, user, url } = this.props;
    const { user, url } = this.props;
    console.log('TCL: Product -> getItems -> url', url);
    // const paramUrl = urlUtils.getParamsUrl('product', this.props);
    const paramUrl = url.slice(1);


    let userId = 'unlogged_user';
    if (user) userId = user._id;

    api.products.getOne(paramUrl, '', userId, (error, res) => {
      if (res) {
        const product = res.data;

        this.setState({ product, loaded: true });
      } else {
        Router.push('/404');
      }
    });
  }

  getRefundsText() {
    api.contents.getByKey('refunds', (error, res) => {
      if (res) {
        const refundsText = res.data;

        this.setState({ refundsText });
      }
    });
  }

  render() {
    const { product, loaded, refundsText } = this.state;
    const { img, alt } = product;
    const { location, url } = this.props;

    // const productName = _.get(product, 'name.es', `Producto de ${infoSource.companyName}`);
    // const productDesc = _.get(product, 'shortDesc.es', `Producto de ${infoSource.companyName}`);

    if (!loaded) return null;

    // const indexEdit = urlUtils.getParamsUrl('index', this.props);
    const indexEdit = url.slice(1);

    return (
      <section className="app-product" itemScope itemType="http://schema.org/Product">
        {/*
        <Helmet>
          <title>{_.get(product, 'seoTitle.es', productName)}</title>
          <meta name="description" content={_.get(product, 'seoDesc.es', productDesc)} />
        </Helmet> */}

        <MobileHeader
          hiddenSandwich
          hiddenSearch
          showCart
          lastLocation={_.get(location, 'state.lastLocation', '')}
          text={_.get(product, 'name.es', '')}
        />

        <div className="product-header">
          <h1>
            {product.name.es}
          </h1>
          <p>Botiga{url}</p>
        </div>

        <section className="app-product-box_product">
          {/* <BoxSlider
            badge={_.get(product, 'state', '')}
            images={_.get(product, 'img', [])}
            item={product}
          /> */}
          <BoxBuyProduct
            item={product}
            index={indexEdit === '' ? -1 : Number(indexEdit)}
            alt={_.get(alt, '0', name)}
            src={img}
          />
        </section>

        {/* <section className="app-product-box_information">
          <BoxDetails
            item={product}
            refundsText={refundsText}
          /> */}

        {/* <BoxRatings
            productId={product._id}
          />
        </section> */}

        <InfoSwitcher product={product} />

        <RelatedProduct
          key={_.get(product, '_id', 'newkey')}
          item={product}
        />
      </section>
    );
  }
}


Product.propTypes = { location: PropTypes.object.isRequired };

export default connect(state => ({
  user: state.user.user
}))(Product);
