import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { isClient } from '../../../serverServices/utils';
import RatingsForm from './RatingsForm';

let modalRoot = '';
if (isClient) modalRoot = document.getElementById('modal-root');

const RatingContainer = ({ onClose, open, ...otherProps }) => ReactDOM.createPortal(
  <div
    className={`rating_form_ui ${open ? 'rating_form_ui-show' : ''}`}
    onClick={onClose}
  >
    {
      open && (
        <RatingsForm
          {...otherProps}
          onClose={onClose}
        />
      )
    }
  </div>,
  modalRoot
);

RatingContainer.propTypes = {
  open: PropTypes.bool.isRequired
};

export default RatingContainer;
