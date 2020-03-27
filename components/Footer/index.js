// import _ from 'lodash';
import React, { Component } from 'react';
import _get from 'lodash/get';
import Link from 'next/link';
import { api } from '../../serverServices';
import { withWindowResize } from '../hoc';
import { Rating } from '../common';
import MailChimpForm from './MailChimpForm';

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
    <img className="confianza-online" src="/images/confianza-online.svg" alt="Confianza online" />
    <div>
      <img className="paypal-white" src="/images/paypal-white.svg" alt="PayPal" />
      <img className="pago-seguro" src="/images/pago-seguro-ok.png" alt="Pago seguro" />
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
    this._isMounted = false;
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  getData() {
    try {
      api.ratings.avg((error, res) => {
        if (!this._isMounted) return;
        if (res) {
          const { total, avg } = res.data;

          this.setState({ avg, total, loading: false });
        }

        this.setState({ loading: false });
      });

      api.contents.getByKey('privacy-first', (error, res) => {
        if (!this._isMounted) return;
        if (res) {
          const legal = res.data;

          this.setState({ legal });
        }
      });
    } catch (err) {
      console.log("Footer -> getData -> err", err)
    }    
  }


  render() {
    const { avg, total, loading, legal } = this.state;
    const { screen, selection } = this.props;
    const products = _get(selection, 'products', []);

    return (
      <footer className="app_footer">
        <section className="flex_box">

          <div className="left">
            <div className="footer-list">
              <div className="column">
                <Link href="/avis-legal">
                  <a>
                    <p>Ús de la plataforma</p>
                  </a>
                </Link>
                <Link href="">
                  <a>
                    <p>Búsqueda de pràctiques</p>
                  </a>
                </Link>
                <Link href="">
                  <a>
                    <p>Procediment de la reserva</p>
                  </a>
                </Link>
              </div>
              <div className="column">
                <h5>Destacats</h5>
                {products.map((product) => {
                  return (
                    <Link key={product.name.es} href="/[entity]" as={`/${product.url.es}`}>
                      <a>
                        <p>{product.name.es}</p>
                      </a>
                    </Link>
                  );
                })}
              </div>
              <div className="column">
                <h5>Serveis</h5>
                <Link href="">
                  <a>
                    <p>Estudiants</p>
                  </a>
                </Link>
                <Link href="">
                  <a>
                    <p>Professionals</p>
                  </a>
                </Link>
              </div>
              <div className="column">
                <h5>Sobre nosaltres</h5>
                <Link href="/qui-som">
                  <a>
                    <p>Qui som</p>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <p>Events</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-legal">
            <Link href="/avis-legal">
              {/* <Link href="/[legal]" as="/refunds"> */}
              <a>
                <p>AVÍS LEGAL</p>
              </a>
            </Link>
            <p className="vertical-line">|</p>
            <Link href="/politica-cookies">
              {/* <Link href="/[legal]" as="/cookies"> */}
              <a>
                <p>POLITICA DE COOKIES</p>
              </a>
            </Link>
            <p className="vertical-line">|</p>
            <Link href="/politica-privacitat">
              {/* <Link href="/[legal]" as="/privacitat"> */}
              <a>
                <p>POLÍTICA DE PRIVACITAT</p>
              </a>
            </Link>
            <p className="vertical-line">|</p>
            <Link href="">
              {/* <Link href="/[legal]" as="/terms-and-conditions"> */}
              <a>
                <p>CONDICIONS D'ÚS</p>
              </a>
            </Link>
          </div>
          <div className="right">
            <div className="app_footer-mailchimp">
              <MailChimpForm legal={legal} />
            </div>
            <div className="app_footer-social">
              <h5>Síguenos en:</h5>
              <a href={infoSource.fbUrl} target="_blank" rel="noopener noreferrer"><span className="facebook" /></a>
              <a href={infoSource.twitterUrl} target="_blank" rel="noopener noreferrer"><span className="twitter" /></a>
              <a href={infoSource.googleUrl} target="_blank" rel="noopener noreferrer"><span className="google" /></a>
              <a href={infoSource.linkedinUrl} target="_blank" rel="noopener noreferrer"><span className="linkedin" /></a>
            </div>
          </div>
        </section>
      </footer>
    );
  }
}

export default withWindowResize(Footer);
