import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { api } from '../../../serverServices';
import BoxBuyProduct from './BoxBuyProduct';
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

  getItems() {
    const { user, url } = this.props;
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
    const { location, url, categories } = this.props;

    if (!loaded) return null;
    const indexEdit = url.slice(1);

    return (
      <section className="app-product" itemScope itemType="http://schema.org/Product">
        <div className="product-header">
          <h1>
            {product.name.es}
          </h1>
          <p>Botiga{url}</p>
        </div>
        <div className="return-to-shop">
          <Link href="/shop/todos">
            <a>
              <h4> &lt;&lt; Tornar a la Botiga</h4>
            </a>
          </Link>
        </div>
        <section className="app-product-box_product">
          <BoxBuyProduct
            item={product}
            index={indexEdit === '' ? -1 : Number(indexEdit)}
            alt={_.get(alt, '0', name)}
            src={img}
          />
        </section>
        <InfoSwitcher product={product} />
        <RelatedProduct
          key={_.get(product, '_id', 'newkey')}
          item={product}
        />
      </section>

    );
  }
}

export default connect(state => ({ user: state.user.user }))(Product);
