import _ from 'lodash';
import React, { Component } from 'react';

import { api } from '../../serverServices';
// import { urlUtils } from '../../utils';
import { MobileHeader } from '../common';


export default class Legal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      loading: true,
      content: {}
    };

    this.getContent = this.getContent.bind(this);
    console.log('this.props', this.props);
  }

  componentDidMount() {
    // const key = urlUtils.getParamsUrl('key', this.props);
    const { url } = this.props;
    const key = url.split('/').pop();
    this.setState({ key });
    this.getContent();
  }

  componentDidUpdate() {
    const { key: oldKey } = this.state;

    // const newKey = urlUtils.getParamsUrl('key', this.props);
    const { url } = this.props;
    const newKey = url.split('/').pop();
    if (oldKey !== newKey) {
      this.setState({ key: newKey, loading: true });
      this.getContent();
    }
  }


  getContent() {
    // const key = urlUtils.getParamsUrl('key', this.props);

    const { url } = this.props;
    const key = url.split('/').pop();
    api.contents.getByKey(key, (error, res) => {
      if (res) {
        const content = res.data;

        this.setState({ content, loading: false });
      }
    });
  }

  render() {
    const { loading, content } = this.state;

    if (loading) return null;

    return (
      <section className="app-legal">
        <MobileHeader
          green
          logo
        />

        <div className="app-legal-info">
          <h1 className="app-legal-title-h1">{ _.get(content, 'title.es', '') }</h1>
        </div>

        <div
          className="app-legal-info app-legal-more_info"
          dangerouslySetInnerHTML={{ __html: _.get(content, 'longDesc.es', '') }}
        />

      </section>
    );
  }
}
