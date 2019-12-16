import _ from 'lodash';
import Link from 'next/link';
import Loader from 'react-loaders';
import React from 'react';
import PropTypes from 'prop-types';

import { routes } from '../../../../utils';
import { api } from '../../../../serverServices';
import ProductItem from '../../../product/ProductItem';


export default class FindResults extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isSearching: false
    };

    this.getItems = this.getItems.bind(this);
    this.getResults = this.getResults.bind(this);
    this.onClose = props.onClick.bind(this);
  }


  componentDidUpdate(prevProps) {
    this.getResults(prevProps, this.props);
  }


  /**
 * Obtener resultados, del nuevo string.
 */
  getResults(prevProps, props) {
    if (props.text !== prevProps.text) {
      this.setState({ isSearching: true });

      if (props.text === '') {
        this.setState({
          isSearching: false,
          items: []
        });
      } else {
        if (props.type === 'category') {
          api.search.getCategories(props.text, '', (error, res) => {
            if (res) {
              const items = res.data;

              this.setState({ items, isSearching: false });
            }
          });
        }

        if (props.type === 'product' && props.text !== '') {
          api.search.getProducts(props.text, { options: { limit: 6 } }, (error, res) => {
            if (res) {
              const items = res.data;

              this.setState({ items, isSearching: false });
            }
          });
        }
      }
    }
  }


  /**
 * Render Items.
 */
  getItems(type, items, numItems) {
    const { text } = this.props;

    if (type === 'category') {
      return items.map(elem => (
        <Link
          key={elem._id}
          onClick={this.onClose}
          href={routes.getRoute(_.get(elem, '_id', ''))}
        >
          <a className="app-s_p-find-categories_btn">
            {_.get(elem, 'name.es', '')}
          </a>
        </Link>
      ));
    }


    if (type === 'product') {
      const newItems = numItems > 5 ? items.slice(0, 4) : items;
      const render = newItems.map(elem => (
        <div key={elem._id}>
          <ProductItem
            isSearch
            item={elem}
            onClick={this.onClose}
          />
        </div>
      ));

      if (numItems > 5) {
        const linkToResult = (
          <div key="show_more">
            <Link
              onClick={this.onClose}
              href={`/search/${encodeURI(text)}`}
            >
              <a className="product_box_ui-s_p app-s_p-not_result">
                <p className="product_box_ui-s_p-more_result">Ver más resultados</p>
              </a> 
            </Link>
          </div>
        );

        render.push(linkToResult);
      }

      return render;
    }

    return [];
  }


  render() {
    const { className, title, type } = this.props;
    const { items, isSearching } = this.state;

    const numItems = items.length;
    let renderItem = (<p className="app-s_p-find-not_result">No se han encontrado resultados</p>);

    if (numItems > 0) {
      renderItem = this.getItems(type, items, numItems);
    }


    return (
      <div className="app-s_p-find">
        <div className="app-s_p-find-title">{`${title} (${items.length})`}</div>

        <div className="app-s_p-horizontal">
          <div className={className}>
            {
              isSearching ? <Loader type="ball-pulse" color="#97DECC" /> : renderItem
            }
          </div>
        </div>
      </div>
    );
  }
}


FindResults.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};
