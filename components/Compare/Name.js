import _ from 'lodash';
import React, { PureComponent } from 'react';

import { api } from '../../serverServices';

class Name extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      shortDesc: '',
      product: {}
    };

    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getName();
  }

  getName() {
    const { id } = this.props;
    let { name, shortDesc } = this.state;
    api.products.getById(id, (error, res) => {
      if (res) {
        const product = res.data;
        name = _.get(product, 'name.es', '');
        shortDesc = _.get(product, 'shortDesc.es', '');
        this.setState({ name, product, shortDesc });
      }
    });

  }

  render() {
    const { name, shortDesc } = this.state;

    return (
      <li>{name}: {shortDesc}</li>
    );
  }
}

export default Name;
