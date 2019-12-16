import Slider from 'rc-slider/lib/Slider';
import React, { Component } from 'react';
import { Link } from '../../../routes';

import 'rc-slider/dist/rc-slider.min.css';

import { api } from '../../../serverServices';


export default class PriceSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 35,
      loaded: false,
      maxPrice: 0,
      minPrice: 0
    };

    this.onSliderChange = this.onSliderChange.bind(this);
    this.getMaxMinPrice = this.getMaxMinPrice.bind(this);
  }

  componentDidMount() {
    this.getMaxMinPrice();
  }

  onSliderChange(value) {
    this.setState({ value });
  }

  getMaxMinPrice() {
    api.products.maxAndMinPrice('', (error, res) => {
      if (res) {
        const { maxPrice, minPrice } = res.data;
        this.setState({ loaded: true, maxPrice, minPrice });
      }
    });
  }


  render() {
    const { value, loaded, maxPrice, minPrice } = this.state;

    if (!loaded) return null;

    return (
      <div className="filter_ui-home">
        <p className="filter_ui-title">¿Cuál es tu presupuesto ideal?</p>
        <p className="filter_ui-subtitle mobile">Selecciona un presupuesto y te proponemos la mejor selección.</p>

        <div className="container">
          <div className="filter_ui-price">
            <p>Precio:</p>
            <Slider
              className="filter_ui-price_slider"
              max={Math.ceil(maxPrice)}
              min={Math.floor(minPrice)}
              value={value}
              onChange={this.onSliderChange}
            />
            <p>{`${value}€`}</p>
          </div>

          <Link route={`/budget/${value}`}>
            <a className="button_ui">Buscar</a>
          </Link>


        </div>

        <p className="filter_ui-subtitle desktop">Selecciona un presupuesto y te proponemos la mejor selección.</p>

      </div>
    );
  }
}
