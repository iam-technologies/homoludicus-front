import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'next/link';
import React, { Component } from 'react';

// import { showSearchActs } from '../reducer';  // version anterior con reducer en la misma carpeta

import { showSearchActs } from '../../../redux/actions';
import FormSearch from './FormSearch';
import FindResults from './FindResults';
import infoSource from '../../../utils/infoSource';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { textSearch: '' };

    this.onShowSearch = bindActionCreators(showSearchActs, props.dispatch);

    this.onClose = this.onShowSearch.hidden.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(value) {
    const chekValue = value.replace(/\s/g, '');

    if (chekValue !== '' && value.length > 2) {
      this.setState({ textSearch: value });
    } else if (chekValue === '') {
      this.setState({ textSearch: '' });
    }
  }


  render() {
    const { show } = this.props;
    const { textSearch } = this.state;

    return (
      <section className={`app-search_popup${!show ? '' : '-show'}`}>
        <div className="app-s_p">
          <div className="app-s_p-container">
            <header className="app-s_p-header">
              <div className="app-s_p-div_hidden" />
              <Link
                href="/"
                onClick={this.onClose}
              >
                <a className="app-s_p-logo" href="/">
                  <img src="/images/logo_search.png" style={{ color: 'gray' }} alt={infoSource.companyName} />
                </a>
              </Link>

              <button
                className="app-s_p-right_btn-close"
                onClick={this.onClose}
                type="button"
              >
                <img src="../../../static/images/icon_close.png" alt="Cross" />
              </button>
            </header>

            <FormSearch
              onSubmit={this.onSubmit}
            />


            <FindResults
              className="app-s_p-find-categories"
              text={textSearch}
              title="Categorías"
              type="category"
              onClick={this.onClose}
            />
          </div>

          <div className="app-s_p-container_products">
            <FindResults
              className="app-s_p-find-products"
              text={textSearch}
              title="Productos"
              type="product"
              onClick={this.onClose}
            />
          </div>
        </div>
      </section>
    );
  }
}


export default connect(state => ({ show: state.showSearch.show }))(Search);
