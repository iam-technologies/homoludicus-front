const webpack = require('webpack');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

// require('dotenv').config({
//   path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env'
// });

module.exports = withCSS(withSass({

  webpack: (config) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    // config.plugins.push(
    //   new SWPrecacheWebpackPlugin({
    //     minify: true,
    //     staticFileGlobsIgnorePatterns: [/\.next\//],
    //     runtimeCaching: [
    //       {
    //         handler: 'networkFirst',
    //         urlPattern: /^https?.*/
    //       }
    //     ]
    //   })
    // );

    config.plugins.push(new webpack.DefinePlugin(env));

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    });

    return config;
  }
}));
