import React from 'react';
import PropTypes from 'prop-types';


const WrapperStep = ({ title, children }) => (

  <div className="step-wrapper">
    <div className="step-title"><p>{title}</p></div>

    <div className="step-container">
      {children}
    </div>
  </div>

);

WrapperStep.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};


export default WrapperStep;
