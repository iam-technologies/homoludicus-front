import moment from 'moment';
import React from 'react';

import { Rating } from '../../../common';


export default ({ updatedAt, comment, score, title }) => (
  <div className="a_p-box_ratings-rating">
    <div className="header_rating">
      <div className="stars_rating">
        <Rating
          initialRating={score}
          readonly
        />
        <span itemProp="ratingValue" className="hidden_rating-seo">{score}</span>
      </div>

      <p className="date">{moment(updatedAt).format('LL')}</p>

      {title && <p className="title">{title}</p>}
    </div>

    {comment && <p className="comment">{comment}</p>}
  </div>
);
