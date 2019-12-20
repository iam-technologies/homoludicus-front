// import _ from 'lodash';
import React, { Component } from 'react';

import { api } from '../../serverServices';
import { withWindowResize } from '../hoc';
import { Rating } from '../common';
import MailChimpForm from './MailChimpForm';
import { Link } from '../../routes';

import infoSource from '../../utils/infoSource';

const contactoFooter = (
  <div className="contact">
    <p className="app_footer-title">CONTACTO</p>
    <p>{infoSource.tel}</p>
    <p className="direction">{infoSource.tel}</p>
    <p className="mail"><a href={`mailto:{${infoSource.emailPurcahseAddress}}`}>{infoSource.emailPurcahseAddress}</a></p>

  </div>
);

const imgFooter = (
  <div className="app_footer-img">
    <img className="confianza-online" src="../../static/images/confianza-online.svg" alt="Confianza online" />
    <div>
      <img className="paypal-white" src="../../static/images/paypal-white.svg" alt="PayPal" />
      <img className="pago-seguro" src="../../static/images/pago-seguro-ok.png" alt="Pago seguro" />
    </div>
  </div>
);

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avg: 0,
      total: 0,
      loading: true,
      legal: ''
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    api.ratings.avg((error, res) => {
      if (res) {
        const { total, avg } = res.data;

        this.setState({ avg, total, loading: false });
      }

      this.setState({ loading: false });
    });

    api.contents.getByKey('privacy-first', (error, res) => {
      if (res) {
        const legal = res.data;

        this.setState({ legal });
      }
    });
  }


  render() {
    const { avg, total, loading, legal } = this.state;
    const { screen } = this.props;

    return (
      <footer className="app_footer">
        <section className="flex_box">

          <div className="left">
            <div className="footer-list">
              <div className="column">
                <h5>Destacats</h5>
                <Link route="/legal/refunds">
                  <a>
                    <p>Ús de la plataforma</p>
                  </a>
                </Link>
                <Link route="">
                  <a>
                    <p>Búsqueda de pràctiques</p>
                  </a>
                </Link>
                <Link route="">
                  <a>
                    <p>Procediment de la reserva</p>
                  </a>
                </Link>
              </div>
              <div className="column">
                <Link route="">
                  <a>
                    <p>JOC DESTACAT</p>
                  </a>
                </Link>
                <Link route="">
                  <a>
                    <p>JOC DESTACAT</p>
                  </a>
                </Link>
                <Link route="">
                  <a>
                    <p>JOC DESTACAT</p>
                  </a>
                </Link>
              </div>
              <div className="column">
                <h5>Serveis</h5>
                <Link route="">
                  <a>
                    <p>Estudiants</p>
                  </a>
                </Link>
                <Link route="">
                  <a>
                    <p>Professionals</p>
                  </a>
                </Link>
              </div>
              <div className="column">
                <h5>Sobre nosaltres</h5>
                <Link route="">
                  <a>
                    <p>Qui som</p>
                  </a>
                </Link>
                <Link route="">
                  <a>
                    <p>Events</p>
                  </a>
                </Link>
              </div>
            </div>
            <div className="footer-legal">
              <Link route="/legal/refunds">
                <a>
                  <p>AVÍS LEGAL</p>
                </a>
              </Link>
              <p className="vertical-line">|</p>
              <Link route="/legal/cookies">
                <a>
                  <p>POLITICA DE COOKIES</p>
                </a>
              </Link>
              <p className="vertical-line">|</p>
              <Link route="/legal/privacitat">
                <a>
                  <p>POLÍTICA DE PRIVACITAT</p>
                </a>
              </Link>
              <p className="vertical-line">|</p>
              <Link route="/legal/terms-and-conditions">
                <a>
                  <p>CONDICIONS D'ÚS</p>
                </a>
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="app_footer-mailchimp">
              <MailChimpForm legal={legal} />
            </div>
            <div className="app_footer-social">
              <h5>Síguenos en:</h5>
              <a href={infoSource.fbUrl} target="_blank" rel="noopener noreferrer"><span className="facebook" /></a>
              <a href={infoSource.twitterUrl} target="_blank" rel="noopener noreferrer"><span className="twitter" /></a>
              <a href={infoSource.instagramUrl} target="_blank" rel="noopener noreferrer"><span className="instagram" /></a>
              <a href={infoSource.pinterestUrl} target="_blank" rel="noopener noreferrer"><span className="pinterest" /></a>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default withWindowResize(Footer);
