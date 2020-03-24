import React from 'react';
import { withRouter } from 'next/router';

import { Page404, Layout } from '../components';

class ErrorPage extends React.Component {
  static getInitialProps({ res, xhr }) {
    const errorCode = res ? res.statusCode : (xhr ? xhr.status : null);
    return { errorCode };
  }

  render() {
    let response;
    const { errorCode, router, categories } = this.props;

    switch (errorCode) {
      case 200: // Also display a 404 if someone requests /_error explicitly
      case 404:
        response = <Layout categories={categories}><Page404 /></Layout>;
        break;
      case 500:
        response = (
                  <div>
                      <h1 className="display-4">Internal Server Error</h1>
                      <p>An internal server error occurred.</p>
                    </div>
        );
        break;
      default:
        response = (
                  <div>
                      <h1 className="display-4">HTTP {errorCode} Error</h1>
                      <p>
                            An <strong>HTTP {errorCode}</strong> error occurred while
              trying to access <strong>{router.pathname}</strong>
                        </p>
                    </div>
        );
    }

    return response;
  }
}

export default withRouter(ErrorPage);
