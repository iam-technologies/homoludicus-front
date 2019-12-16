import React, { Component } from 'react';
import infoSource from '../../utils/infoSource';

import { isClient } from '../../serverServices/utils';

export default class CookiesPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };

    this.acceptCookies = this.acceptCookies.bind(this);
  }

  acceptCookies() {
    if (isClient && window.localStorage) {
      window.localStorage.infoSource.name__accept__cookies = true;
    }

    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;

    return (
      <section>
        { (isClient && window.localStorage && !window.localStorage.cocholate__accept__cookies)
          ? (
            <article className={`cookies-popup${show ? '' : '-hide'}`}>
              <p>Utilizamos cookies propias y de terceros para ofrecerte una mejor experiencia de navegación,
                analizar el tráfico del sitio, personalizar el contenido y publicar anuncios específicos.
                Lea sobre cómo usamos las cookies y cómo puede controlarlas haciendo un clic en “Política de cookies”.
                Si continúas utilizando este sitio, acepta nuestro uso de cookies.
              </p>
              <div className="cookies-popup__button-container">
                <a href="/legal/cookies">Política de cookies</a>
                <button type="button" className="cookies-popup__button" onClick={this.acceptCookies}>Estoy de acuerdo</button>
              </div>
            </article>
          )
          : ('')}
      </section>
    );
  }
}
