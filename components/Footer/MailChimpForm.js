import _ from 'lodash';
import React, { Component } from 'react';
import { trackEvent } from 'react-with-analytics';
import infoSource from '../../utils/infoSource';

export default class MailChimpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      showLegal: false
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);

    this.showLegal = this.showLegal.bind(this);
    this.hideLegal = this.hideLegal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.hideLegal);
  }

  componentDidUpdate() {
    if (document.querySelectorAll('#legal a').length > 0 && document.querySelectorAll('#legal a').forEach) {
      document.querySelectorAll('#legal a').forEach((a) => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.hideLegal);
  }

  onChange(e) {
    this.setState({ emailValue: e.target.value });
  }

  onClick() {
    trackEvent('Botones', 'Clic', 'Newsletter'); // category, action, label
  }

  showLegal() {
    this.setState({ showLegal: true });
  }

  hideLegal(e) {
    const el = e.target;

    if (el.id === 'legal') return;

    const parent = el.closest('#legal');
    if (parent && parent.id === 'legal') return;

    this.setState({ showLegal: false });
  }

  render() {
    const { emailValue, showLegal } = this.state;
    const { legal } = this.props;

    return (
      <div id="mc_embed_signup">
        <p className="app_footer-title">Suscríbete a nuestro newsletter:</p>

        <form action={infoSource.action} method="POST" target="_blank">

          <input type="hidden" name="u" value={infoSource.uValue} />
          <input type="hidden" name="id" value={infoSource.idValue} />

          <div className="container">

            <input
              type="email"
              name="EMAIL"
              className="email"
              value={emailValue}
              onChange={this.onChange}
              placeholder="email"
              required
            />

            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name={`b_${infoSource.uValue}_${infoSource.idValue}`} tabIndex="-1" />
            </div>

            <div className="clear">
              <input
                type="submit"
                value="OK"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button"
                onClick={this.onClick}
              />
            </div>

          </div>

          <br />

          <div className="legal-line">

            <input
              type="checkbox"
              className="checkbox"
              value="1"
              required
            />

            <div className="privacy">
              He leído y acepto la política de privacidad. <span className="privacy-link" onClick={this.showLegal}>Información básica aquí</span>
            </div>

            {
              showLegal && (

              <div
                id="legal"
                className="legal-tooltip"
                dangerouslySetInnerHTML={{ __html: _.get(legal, 'longDesc.es', '') }}
              />

              )
            }

          </div>

        </form>
      </div>
    );
  }
}
