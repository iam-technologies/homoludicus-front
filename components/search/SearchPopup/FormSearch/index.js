import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class FormSearch extends Component {
  constructor(props) {
    super(props);

    this.refText = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.debounce = _.debounce(value => props.onSubmit(value), 300);
  }

  shouldComponentUpdate() {
    return false;
  }

  onChange(e) {
    e.preventDefault();
    const { value } = this.refText.current;
    const text = value.trim().replace(/ +/g, ' ');

    this.debounce(text);
  }

  render() {
    return (
      <form onSubmit={this.onChange} className="app-s_p-form" autoComplete="off">
        <label htmlFor="search_input_ui">
          <div
            className="app-s_p-form-img"
          >
            <img src="../../../../static/images/icon_search_gray.png" alt="Search" />
          </div>

          <input
            id="search_input_ui"
            className="app-s_p-form-text"
            ref={this.refText}
            placeholder="Buscar algo..."
            type="text"
            onChange={this.onChange}
          />
        </label>
      </form>
    );
  }
}


FormSearch.propTypes = { onSubmit: PropTypes.func.isRequired };
