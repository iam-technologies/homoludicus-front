import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class InputCreditCard extends Component {
  constructor(props) {
    super(props);

    this.state = { focus: false };

    this.onFocus = this.onFocus.bind(this);
    this.onChange = props.onChange.bind(this);
  }

  onFocus() {
    const { focus } = this.state;

    this.setState({ focus: !focus });
  }

  render() {
    const { focus } = this.state;
    const { children, label, srcImg, error } = this.props;

    const className = `stripe_input ${focus ? 'focus' : ''}`;

    const element = React.cloneElement(children, {
      className,
      onBlur: this.onFocus,
      onChange: this.onChange,
      onFocus: this.onFocus
    });

    return (
      <div className="credit_card_ui-input">
        <p className="label">{label}</p>

        { element }

        {
          srcImg === '' ? null : (
            <div className="img_icon_card">
              <img src={srcImg} alt={label} />
            </div>
          )
        }

        {
          error !== '' && (<span className="credit_card_ui-input_error">{error}</span>)
        }
      </div>
    );
  }
}


InputCreditCard.propTypes = {
  label: PropTypes.string.isRequired,
  srcImg: PropTypes.string,
  error: PropTypes.string
};

InputCreditCard.defaultProps = {
  srcImg: '',
  error: ''
};
