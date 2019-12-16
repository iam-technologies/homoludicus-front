import _ from 'lodash';
import React from 'react';
// import { Helmet } from 'react-helmet';

import Router from 'next/router';
import { api } from '../../serverServices';
import { withWindowResize } from '../hoc';
import { MobileHeader } from '../common';
import Filter from '../Filter';


class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '',
      category: {},
      loaded: false
    };
    this.getCategory = this.getCategory.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  componentDidUpdate(prevProps, prevState) {
    // const { history } = this.props;
    // const prevHistory = prevProps.history;
    const { id } = this.props;
    const prevId = prevProps.id;

    const { loaded, categoryId } = this.state;
    const prevLoaded = prevState.loaded;
    const prevCategoryId = prevState.categoryId;

    if (loaded !== prevLoaded
      || categoryId !== prevCategoryId
      // || !_.isEqual(history, prevHistory)
      || !_.isEqual(id, prevId)
    ) {
      this.getCategory();
    }
  }

  static getDerivedStateFromProps(props) {
    const categoryId = props.id;

    return {
      categoryId,
      loaded: false
    };
  }

  getCategory() {
    const { loaded/* , categoryId */ } = this.state;
    // const { history } = this.props;
    const { id } = this.props;

    if (loaded) return;

    api.categories.getFilters(id, '', (error, res) => {
      let category = {};

      if (res) { category = res.data; }
      // if (category === null) return history.push('/');
      if (category === null) return Router.push('/');


      return this.setState({ loaded: true, category });
    });
  }


  render() {
    const { category } = this.state;

    const { /* location, */ pathname, screen } = this.props;

    const descMain = _.get(category, 'descMain.es', '');

    return (
      <section className="app-category">
        {/* <Helmet>
          <title>{_.get(category, 'titleSeo.es', {`categoría de productos de ${infoSource.compNameCap}`})}</title>
          <meta name="description" content={_.get(category, 'descSeo.es', {`categoría de productos de ${infoSource.compNameCap}`})} />
        </Helmet> */}

        <MobileHeader
          green
          text={_.get(category, 'name.es', '')}
        />

        <div className="app-category-info">
          {
            screen === 'lg' && (
              <h1 className="app-category-title-h1">{ _.get(category, 'name.es', '') }</h1>
            )
          }
          {
            descMain && (
              <p className="app-category-description">{ _.get(category, 'descMain.es', '') }</p>
            )
          }

        </div>

        {
          _.get(category, '_id', '') !== '' && (
            <Filter
              category={category}
              // location={location.pathname}
              location={pathname}
              textId={category._id}
              callServices="getByCategory"
            />
          )
        }

        <div
          className="app-category-info app-category-more_info"
          dangerouslySetInnerHTML={{ __html: _.get(category, '_id', '') }}
        />
      </section>
    );
  }
}

export default withWindowResize(Category);
