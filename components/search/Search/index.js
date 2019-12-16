import React from 'react';

import Router from 'next/router';
// import { urlUtils } from '../../../utils';
import { api } from '../../../serverServices';
import { withWindowResize } from '../../hoc';
import { MobileHeader } from '../../common';
import Filter from '../../Filter';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      search: {}
      // query: ''
    };

    this.getSearch = this.getSearch.bind(this);
  }

  componentDidMount() {
    this.getSearch();
  }

  componentDidUpdate() {
    this.getSearch();
  }

  // static getDerivedStateFromProps(props, state) {
  //   const query = urlUtils.getParamsUrl('query', props);

  //   if (query !== state.query) {
  //     return {
  //       query,
  //       loaded: false
  //     };
  //   }

  //   return null;
  // }

  getSearch() {
    // const { loaded, query } = this.state;
    // const { history } = this.props;
    const { loaded } = this.state;
    const { query } = this.props;

    if (loaded) return;

    api.search.getFilters(query, '', (error, res) => {
      let search = {};

      if (res) { search = res.data; }
      // if (search === null) return history.push('/');
      if (search === null) return Router.push('/');

      return this.setState({ loaded: true, search });
    });
  }


  render() {
    const { /* query, */ search, loaded } = this.state;
    const { /* location, */ pathname, screen, query } = this.props;

    if (!loaded) return null;

    return (
      <section className="app-search">
        <MobileHeader
          green
          text="Resultado búsqueda:"
          subText={query}
        />

        {
          screen === 'lg' && (
            <div className="app-search-info">
              <p className="app-search-title">{`Resultados para la búsqueda de "${query}"`}</p>
            </div>
          )
        }

        {
          query !== '' && (
            <Filter
              category={search}
              callServices="getBySearch"
              location={pathname}
              textId={query}
            />
          )
        }
      </section>
    );
  }
}


export default withWindowResize(Search);
