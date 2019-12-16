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

            <div>
              <div className="logo">
                <Link route="/">
                  <a>
                    <img src="../../static/images/company/icon_logotipo_neutro.png" alt={infoSource.companyName} />
                  </a>
                </Link>
              </div>

              <div className="valuation">
                {
                  !loading && (
                    <Rating
                      readonly
                      medium
                      initialRating={avg}
                    />
                  )
                }
                <p>{total} valoraciones.</p>
              </div>
            </div>

            <p className="blog"><a href="https://blog.es/" target="_blank" rel="noopener noreferrer">Visita nuestro blog</a></p>

            {
              screen !== 'xs' && contactoFooter
            }

            <div className="app_footer-social">
              <a href={infoSource.fbUrl} target="_blank" rel="noopener noreferrer"><span className="facebook" /></a>
              <a href={infoSource.twitterUrl} target="_blank" rel="noopener noreferrer"><span className="twitter" /></a>
              <a href={infoSource.instagramUrl} target="_blank" rel="noopener noreferrer"><span className="instagram" /></a>
              <a href={infoSource.pinterestUrl} target="_blank" rel="noopener noreferrer"><span className="pinterest" /></a>
            </div>
          </div>

          <div className="right">

            <div className="app_footer-legal">
              <p className="app_footer-title">INFORMACIÓN DE COMPRA</p>
              <p>
                <Link route="/legal/refunds"><a>Envío y devoluciones</a></Link>
              </p>
              <p>
                <Link route="/legal/terms-and-conditions"><a>Términos y condiciones</a></Link>
              </p>
              <p>
                <Link route="/legal/cookies"><a>Política de Cookies</a></Link>
              </p>
            </div>

            <div className="app_footer-mailchimp">
              <MailChimpForm legal={legal} />
            </div>

            {
              screen !== 'xs' && imgFooter
            }

          </div>

          {
            screen === 'xs' && contactoFooter
          }

          {
            screen === 'xs' && imgFooter
          }

        </section>
      </footer>
    );
  }
}

export default withWindowResize(Footer);
