import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { api } from '../../../../serverServices';
import { withWindowResize } from '../../../hoc';
import { ButtonInput } from '../../../common';
import RatingCard from './RatingCard';


class BoxRatings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      ratings: [],
      allRatings: [],
      show: false,
      showMore: false,
      total: 0
    };

    this.onClick = this.onClick.bind(this);
    this.onShowMore = this.onShowMore.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  onClick() {
    const { show } = this.state;
    this.setState({ show: !show });
  }

  onShowMore() {
    const { allRatings, showMore } = this.state;

    const ratings = !showMore ? allRatings : allRatings.slice(0, 5);

    this.setState({ ratings, showMore: !showMore });
  }

  getData() {
    const { productId } = this.props;

    api.ratings.getByProduct(productId, (error, res) => {
      if (res) {
        const allRatings = res.data || [];

        this.setState({
          allRatings,
          loading: false,
          ratings: allRatings.slice(0, 5),
          total: allRatings.length
        });

        return;
      }

      this.setState({ loading: false });
    });
  }

  render() {
    const { show, total, ratings, loading, allRatings, showMore } = this.state;
    const { screen } = this.props;

    if (loading) return null;

    return (
      <div className="a_p-box_ratings" itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
        <div
          className="a_p-box_ratings-top"
          onClick={screen !== 'lg' ? this.onClick : undefined}
        >
          <p className="title">Valoraciones</p>
          <p className="num_rating">
            <span itemProp="ratingCount">{total}</span> valoraciones
          </p>

          <img className={`btn_icon_bottom ${show ? 'active' : ''}`} src="../../../static/images/icon_arrow_bottom.png" alt="Arrow bottom" />
        </div>
        {
          screen === 'lg' || show ? (
            ratings.map(elem => (
              <RatingCard
                {...elem}
                key={elem._id}
              />
            ))
          ) : null
        }
        {
          allRatings.length > 5 && (screen === 'lg' || show) ? (
            <ButtonInput
              ghost
              className="a_p-box_ratings-btn_show_more"
              label={`Mostrar ${showMore ? 'menos' : 'más'} Valoraciones`}
              onClick={this.onShowMore}
            />
          ) : null
        }
      </div>
    );
  }
}

BoxRatings.propsTypes = {
  productId: PropTypes.string.isRequired,
  screen: PropTypes.string.isRequired
};


export default withWindowResize(BoxRatings);
