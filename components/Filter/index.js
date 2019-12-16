import _ from 'lodash';
import Loader from 'react-loaders';
import React from 'react';
import PropTypes from 'prop-types';

import { api } from '../../serverServices';
import { ButtonInput, ArrowTop } from '../common';
import ProductList from '../product/ProductList';
import FilterUI from './FilterUI';
import Compare from '../Compare';


export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      loaded: false,
      numProducts: 0,
      options: { skip: 0 },
      products: [],
      clickCompare: false,
      selected: []
    };

    this.getProducts = this.getProducts.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickCompare = this.onClickCompare.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getSelectedItems = this.getSelectedItems.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    const { textId, callServices, category } = this.props;
    const prevTextId = prevProps.textId;
    const prevCallServices = prevProps.callServices;
    const prevCategory = prevProps.category;

    const { filters, options, loaded } = this.state;
    const prevFilters = prevState.filters;
    const prevOptions = prevState.options;
    const prevLoaded = prevState.loaded;


    if (prevTextId !== textId
      || callServices !== prevCallServices
      || loaded !== prevLoaded
      || category !== prevCategory
      || !_.isEqual(options, prevOptions)
      || !_.isEqual(filters, prevFilters)
    ) {
      this.getProducts();
    }
  }


  onChange(path, value) {
    const { filters, options } = this.state;

    _.set(options, 'skip', 0);

    if (path.indexOf('attributes') !== -1 && _.get(filters, path, '') === value) {
      _.set(filters, path, '');
    } else {
      _.set(filters, path, value);
    }

    this.setState({ loaded: false, filters: { ...filters }, options });
  }

  onClick() {
    const { options } = this.state;

    _.set(options, 'skip', options.skip + 1);

    this.setState({ loaded: false, options });
  }

  onClickCompare() {
    this.setState({ clickCompare: true });
  }

  onSelect(e, id) {
    e.stopPropagation();
    const { selected } = this.state;
    const idIndex = selected.indexOf(id);

    if (selected.length >= 3 && idIndex === -1) return;

    if (idIndex === -1) {
      this.setState({ selected: [...selected, id] });
    } else {
      selected.splice(idIndex, 1);
      this.setState({ selected: [...selected] });
    }
  }

  getProducts() {
    const { textId, callServices } = this.props;
    const { filters, options, loaded } = this.state;

    if (loaded) return;


    api.products[callServices](textId, { filters, options }, (error, res) => {
      const { products = [], numProducts = 0 } = res.data;

      this.setState({ loaded: true, products, numProducts });
    });
  }

  getSelectedItems() {
    const { selected, products } = this.state;
    const selectedItems = [];
    products.map((item) => {
      if (selected.indexOf(item._id) !== -1) selectedItems.push(item);
    });
    return selectedItems;
  }


  render() {
    const { location, category } = this.props;
    const compare = _.get(category, 'compare', false);
    const { loaded, products, filters, numProducts, clickCompare, selected } = this.state;
    const count = products.length;

    const selectedItems = this.getSelectedItems();

    return (
      <section className="app-filter">
        <FilterUI
          category={category}
          onChange={this.onChange}
          filters={filters}
        />

        {
          compare && (
            <Compare
              onClickCompare={this.onClickCompare}
              clickCompare={clickCompare}
              selected={selected}
              catName={_.get(category, 'name.es', '')}
              catId={category}
              selectedItems={selectedItems}
            />
          )
        }

        {
          count > 0 ? (
            <ProductList
              location={location}
              items={products}
              clickCompare={clickCompare}
              onSelect={this.onSelect}
              selected={selected}
              category={category}
            />
          ) : (
            category.minPrice ? <h3 className="app-filter-info">Lo sentimos, actualmente no hay productos en este rango de precios.</h3>
              : <h3 className="app-filter-info">Lo sentimos, actualmente no hay productos en esta categoría.</h3>)
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

        <ArrowTop />
      </section>
    );
  }
}


Filter.propTypes = {
  category: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  callServices: PropTypes.string.isRequired,
  textId: PropTypes.string.isRequired
};
