import _ from 'lodash';
import React, { Component } from 'react';

import { api } from '../../serverServices';

class LegalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      legal: ''
    };

    this.getLegal = this.getLegal.bind(this);
  }

  componentDidMount() {
    this.getLegal();
  }

  componentDidUpdate() {
    if (document.querySelectorAll('#legal a').length > 0 && document.querySelectorAll('#legal a').forEach) {
      document.querySelectorAll('#legal a').forEach((a) => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }

  getLegal() {
    api.contents.getByKey('privacy-first', (error, res) => {
      if (res) {
        const legal = res.data;

        this.setState({ legal });
      }
    });
  }


  render() {
    const { legal } = this.state;

    return (
      <div className="app_checkout-legal">
        <strong>
          <div
            dangerouslySetInnerHTML={{ __html: _.get(legal, 'title.es', '') }}
          />
        </strong>
        <div
          id="legal"
          dangerouslySetInnerHTML={{ __html: _.get(legal, 'longDesc.es', '') }}
        />
      </div>
    );
  }
}

export default LegalInfo;
