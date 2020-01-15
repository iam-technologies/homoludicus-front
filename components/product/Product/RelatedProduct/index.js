import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { routes } from '../../../../utils';
import { api } from '../../../../serverServices';
import { withWindowResize } from '../../../hoc';
import ProductItem from '../../ProductItem';


class RelatedProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item,
      items: [],
      loaded: false,
      settings: {
        arrows: true,
        className: 'a_p-related_p-slider',
        dots: false,
        infinite: false,
        slidesToScroll: 3,
        slidesToShow: 3,
        speed: 1200
      }
    };

    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    this.getItems();
    console.log('props', this.props);
  }

  componentDidUpdate() {
    this.getItems();
  }


  getItems() {
    const { item } = this.props;
    const { loaded } = this.state;

    if (loaded) return;

    if (item && item._id) {
      api.products.getRelated(item._id, { options: { limit: 18 } }, (error, res) => {
        let items = [];

        if (res) {
          items = res.data;
        }

        this.setState({ items, loaded: true });
      });
    }
  }

  render() {
    const { settings, items, item } = this.state;
    const { screen } = this.props;

    const newSettings = { ...settings };

    if (screen === 'xs') {
      newSettings.slidesToScroll = 1;
      newSettings.slidesToShow = 1;
    }

    if (screen === 'sm') {
      newSettings.slidesToScroll = 2;
      newSettings.slidesToShow = 2;
    }

    if (!items.length) return null;

    let urlCategory = _.get(item, 'mainCategory._id', '');
    if (!urlCategory) {
      urlCategory = _.get(item, 'categories.0._id', '');
    }

    const location = routes.getRoute(urlCategory);
    // console.log('TCL: render -> location', location);


    return (
      <section className="a_p-related_p">
        <h5 className="a_p-related_p-title">Productes relacionats:</h5>
        <div className="related-products-div">
          {
            items.map((elem) => {
              if (elem._id === item._id) return null;

              return (
                <ProductItem
                  item={elem}
                  key={elem._id}
                  location={location}
                />
              );
            })
          }
        </div>
      </section>
    );
  }
}


RelatedProduct.propTypes = { item: PropTypes.object.isRequired };


export default withWindowResize(RelatedProduct);
