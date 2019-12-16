import React, { Component } from 'react';
import Router from 'next/router';
import { Link } from '../../../routes';

import { api } from '../../../serverServices';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };

    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    api.account.signup(email, password)
      .then((res) => {
        if (res.ok) {
          api.account.login(email, password)
            .then((res) => {
              if (res.status === 'success') {
                // this.props.history.push('/');
                Router.push('/');
              }
            });
        } else {
          console.log(res);
        }
      });
  }

  onChange(path, value) {
    this.setState({ [path]: value });
  }

  render() {
    return (
      <div className="signup">
        <form onSubmit={this.onSubmit}>
          <div>
            <input type="email" required name="email" />
          </div>
          <div>
            <input type="password" required minLength="6" name="password" />
          </div>

          <button type="submit">Send</button>
        </form>

        <Link route="/login"><a>¿Volver a login?</a></Link>
      </div>
    );
  }
}
