import _ from 'lodash';
import React, { Component, Fragment } from 'react';
// import Dialog from 'material-ui/Dialog';
import Dialog from '@material-ui/core/Dialog';

import { ButtonInput } from '../../common';
import { api } from '../../../serverServices';


export default class Terms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loading: true,
      content: {}
    };

    this.getContent = this.getContent.bind(this);

    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  componentDidMount() {
    this.getContent('terms-and-conditions');
  }

  onOpen() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false });
  }

  getContent(key) {
    api.contents.getByKey(key, (error, res) => {
      if (res) {
        const content = res.data;
        this.setState({ content, loading: false });
      }
    });
  }

  render() {
    const { loading, content, open } = this.state;

    if (loading) return null;

    const actions = [
      <ButtonInput onClick={this.onClose} label="Cerrar" />
    ];

    return (
      <Fragment>
        <span onClick={this.onOpen}>Leer</span>
        <Dialog
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.onClose}
          autoScrollBodyContent
        >

          <section className="app-legal">

            <div className="app-legal-info">
              <h1 className="app-legal-title-h1">{ _.get(content, 'title.es', '') }</h1>
            </div>

            <div
              className="app-legal-info app-legal-more_info"
              dangerouslySetInnerHTML={{ __html: _.get(content, 'longDesc.es', '') }}
            />

          </section>

        </Dialog>
      </Fragment>
    );
  }
}
