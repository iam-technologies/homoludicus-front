import _ from 'lodash';
import React, { Component } from 'react';
import Loader from 'react-loaders';

import Router from 'next/router';
// import { urlUtils } from '../../../utils';
import { api } from '../../../serverServices';
import { withWindowResize } from '../../hoc';
import FilterUI from '../../Filter/FilterUI';
import { MobileHeader, ButtonInput } from '../../common';
import ProductList from '../../product/ProductList';


class SearchByBudget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      search: {},
      price: '',
      minPrice: 0,
      maxPrice: 0,
      options: { skip: 0 },
      filters: {}
    };

    this.getSearch = this.getSearch.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getMaxMinPrice();
    this.getSearch();
  }

  componentDidUpdate() {
    this.getSearch();
  }

  onClick() {
    const { options } = this.state;
    _.set(options, 'skip', options.skip + 1);

    this.setState({ loaded: false, options });
  }

  onChange(path, value) {
    const { filters, options } = this.state;

    _.set(options, 'skip', 0);
    _.set(filters, path, value);

    this.setState({ loaded: false, filters: { ...filters }, options });
  }

  static getDerivedStateFromProps(props, state) {
    const { price } = props;
    // const price = urlUtils.getParamsUrl('price', props);

    if (price !== state.price) {
      const newPrice = parseInt(price, 10);
      const priceRange = [newPrice - 10, newPrice + 10];

      return {
        price,
        loaded: false,
        filters: { priceRange }
      };
    }

    return null;
  }

  getSearch() {
    const { loaded, options, filters, price } = this.state;
    // const { history } = this.props;

    if (loaded) return;

    const min = _.get(filters, 'priceRange.0', 0);
    const max = _.get(filters, 'priceRange.1', price);

    api.products.getByPrice(min, max, { options }, (error, res) => {
      let search = {};

      if (res) { search = res.data; }
      // if (search === null) return history.push('/');
      if (search === null) return Router.push('/');

      return this.setState({ loaded: true, search });
    });
  }

  getMaxMinPrice() {
    api.products.maxAndMinPrice('', (error, res) => {
      if (res) {
        const { maxPrice, minPrice } = res.data;

        this.setState({ loaded: true, maxPrice, minPrice });
      }
    });
  }


  render() {
    const { search, loaded, filters } = this.state;
    let { maxPrice, minPrice } = this.state;
    const { screen } = this.props;
    maxPrice = Math.ceil(maxPrice);
    minPrice = Math.floor(minPrice);

    const priceRange = _.get(filters, 'priceRange', [0, 0]);
    const category = { ...search, maxPrice, minPrice };
    const products = _.get(search, 'products', []);
    const numProducts = _.get(search, 'numProducts', 0);

    const count = products.length;

    return (
      <section className="app-search">
        <MobileHeader
          green
          text="Búsqueda por presupuesto:"
          subText={`${priceRange[0]}€ a ${priceRange[1]}€`}
        />

        {
          screen === 'lg' && (
            <div className="app-search-info">
              <p className="app-search-title">{`Resultados para un presupuesto de ${priceRange[0]}€ a ${priceRange[1]}€`}</p>
            </div>
          )
        }

        <section className="app-filter">
          <FilterUI
            category={category}
            onChange={this.onChange}
            priceRange={priceRange}
            filters={filters}
          />
          {
            count > 0 ? (
              <ProductList
                location=""
                items={products}
              />
            ) : null
          }

          {
            !loaded && <div className="loading_products"><Loader type="ball-pulse" color="#97DECC" /></div>
          }

          {
            loaded && count > 0 && count < numProducts ? (
              <ButtonInput
                onClick={this.onClick}
                label="MOSTRAR MÁS PRODUCTOS"
                className="btn_show_more"
              />
            ) : null
          }
        </section>

      </section>
    );
  }
}

export default withWindowResize(SearchByBudget);
