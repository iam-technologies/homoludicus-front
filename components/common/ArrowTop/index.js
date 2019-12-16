import _ from 'lodash';
import React, { Component } from 'react';

import { withWindowResize } from '../../hoc';


class ArrowTop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.className = 'btn_arrow_top_ui';
    this.minTopDistance = 250;

    this.onClick = this.onClick.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.debounce = _.debounce(callback => callback(), 300);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onClick() {
    document.scrollingElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  onScroll() {
    const { screen } = this.props;

    if (screen === 'xs' || screen === 'sm') {
      this.debounce(() => {
        const { show } = this.state;
        const { scrollY } = window;

        if (scrollY > this.minTopDistance && !show) {
          this.setState({ show: !show });
        }

        if (scrollY < this.minTopDistance && show) {
          this.setState({ show: !show });
        }
      });
    }
  }


  render() {
    const { screen } = this.props;
    const { show } = this.state;

    if (screen === 'lg') return null;

    return (
      <button
        type="button"
        className={`${this.className} ${show ? `${this.className}-show` : ''}`}
        onClick={this.onClick}
      >
        <img src="../../static/images/icon_arrow_top.png" alt="Subir" />
      </button>
    );
  }
}


export default withWindowResize(ArrowTop);
