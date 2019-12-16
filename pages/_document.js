import React, { Fragment } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

    const { isServer } = ctx;
    const isProduction = process.env.NODE_ENV === 'production';
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      isProduction,
      isServer,
      styles: [
        <Fragment key="styles">
          {initialProps.styles}
          {sheets.getStyleElement()}
        </Fragment>
      ]
    };
  }

  render() {
    const { themeContext, isProduction, isServer } = this.props;

    return (
      <html lang="en-US">
        <Head>
          {/* <meta
            name="theme-color"
            content={themeContext ? themeContext.theme.palette.primary.main : null}
          /> */}

          <meta charSet="utf-8" />
          <meta name="description" content="añada descripción de su tienda" />
          <meta name="theme-color" content="#97DECC" />
          {/* <meta name="theme-color" content="#ffffff" /> */}

          <link rel="apple-touch-icon" sizes="180x180" href="../static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="../static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="../static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="../static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="../static/favicon/safari-pinned-tab.svg" color="#97decc" />
          <link rel="shortcut icon" href="../static/favicon/favicon.ico" />

          <meta name="msapplication-TileColor" content="#97DECC" />
          <meta name="msapplication-config" content="../static/favicon/browserconfig.xml" />

          <meta name="viewport" content="minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no" />

          {/* Google Tag Manager */}
          <script dangerouslySetInnerHTML={{ __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WDPJN7K');` }}
          />


        </Head>

        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: `
            !function (f, b, e, v, n, t, s) {
              if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                  n.callMethod.apply(n, arguments) : n.queue.push(arguments)
              };
              if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
              n.queue = []; t = b.createElement(e); t.async = !0;
              t.src = v; s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2182242768456596');
            fbq('track', 'PageView');
          ` }}
          />
          {isProduction && (
          <Fragment>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-22194548-1" />
            <noscript dangerouslySetInnerHTML={{ __html: `
              <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-WDPJN7K"
              height="0" 
              width="0" 
              style="display:none;visibility:hidden"
              ></iframe>` }}
            />
          </Fragment>
          )}
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPgiPZzi-sVuuuw6pKhiVpAPcQDp5P3nI&libraries=places&language=es"
            async
            defer
          />
          <script src="https://js.stripe.com/v3/" />
        </body>
      </html>
    );
  }
}

export default MyDocument;
