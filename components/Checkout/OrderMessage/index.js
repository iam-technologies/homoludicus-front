
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import settings from '../../../settings';
import { Link } from '../../../routes';

import { dataFormat } from '../../../utils';
import { ButtonInput } from '../../common';

import infoSource from '../../../utils/infoSource';

export default class OrderMessage extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onError = props.onError.bind(this);
  }

  onClick() {
    Router.push('/');
  }

  render() {
    const { type, numOrder, amountTotal, userName } = this.props;
    const lastNum = numOrder.slice(-8);


    return (
      <section className="app_checkout">
        <div className="order_message">
          <header className="app_checkout-header">
            <Link route="/">
              <a className="link">
                <img src="../../../static/images/logo_search.png" alt={infoSource.companyName} />
              </a>
            </Link>
          </header>

          {
            type === 'success' ? (
              <div className="order_message_success">
                <div className="order_message_img">
                  <img src="../../../static/images/order_success.png" alt="Compra realizada" />
                </div>

                <p className="text first">Enhorabuena {userName}!</p>
                <p className="text">Tu compra se ha realizado correctamente.</p>
                <p className="text">En breve recibirás un email con información sobre tu pedido.</p>

                <ButtonInput
                  className="order_message_btn"
                  label="VOLVER A LA TIENDA"
                  onClick={this.onClick}
                />
              </div>
            ) : null
          }
          {
            type === 'budget' ? (
              <div className="order_message_success">
                <div className="order_message_img">
                  <img src="../../../static/images/order_success.png" alt="Compra realizada" />
                </div>

                <p className="text first">Enhorabuena {userName}!</p>
                <p className="text">Tu presupuesto se ha solicitado correctamente.</p>
                <p className="text">En breve recibirás un email con información sobre tu presupuesto.</p>

                <ButtonInput
                  className="order_message_btn"
                  label="VOLVER A LA TIENDA"
                  onClick={this.onClick}
                />
              </div>
            ) : null
          }
          {
            type === 'wireTransfer' ? (
              <div className="order_message_transfer">
                <div className="order_message_img">
                  <img src="../../static/images/order_transfer.png" alt="Información sobre transferencia" />
                </div>

                <p className="text title">PAGO MEDIANTE TRANSFERENCIA BANCARIA</p>
                <p className="text">Deberás realizar el ingreso de <strong>{dataFormat.formatCurrency(amountTotal)}</strong> en la cuenta:</p>
                <p className="text">Nombre: {infoSource.compNameCap}</p>
                <p className="text num_account">{settings.bank_account}</p>
                <p className="text">No olvides poner el número de pedido &#34;<strong>{lastNum}</strong>&#34; en el concepto de la transferencia para que sepamos a quién pertenece el pago.</p>
                <p className="text">Si quieres agilizar el proceso envianos el justificante de la transferencia a <a href={`mailto:${infoSource.emailInfoAddress}`} target="_blank" rel="noopener noreferrer">{infoSource.emailPurcahseAddress}</a></p>

                <ButtonInput
                  className="order_message_btn"
                  label="VOLVER A LA TIENDA"
                  onClick={this.onClick}
                />
              </div>
            ) : null
          }
          {
            type === 'error' ? (
              <div className="order_message_error">
                <div className="order_message_img">
                  <img src="../../../static/images/order_error.png" alt="Error en el pago" />
                </div>

                <p className="text">Ups!! {userName} algo ha fallado en el proceso de pago y tu pedido no ha sido procesado. Vuelve a intentarlo o ponte en contacto con nosotros.</p>

                <ButtonInput
                  className="order_message_btn"
                  label="VOLVER A INTENTARLO"
                  onClick={this.onError}
                />
              </div>
            ) : null
          }
        </div>
      </section>
    );
  }
}

OrderMessage.propTypes = {
  type: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  numOrder: PropTypes.string,
  amountTotal: PropTypes.number,
  userName: PropTypes.string,
  onError: PropTypes.func.isRequired
};

OrderMessage.defaultProps = {
  numOrder: '',
  amountTotal: 0,
  userName: ''
};
