const routes = require('next-routes');

module.exports = routes()

  // LOGIN
  .add('/login-to', 'login-to')
  .add('/forgot-password', 'forgot-password')
  .add('/reset-password/:token', 'reset-password/[token]')

  // CHECKOUT
  .add('/checkout', 'checkout')
  .add('/budget-checkout', 'budget-checkout')
  .add('/landing/:key', 'landing/[key]')

  // LEGAL
  .add('/legal/:key', 'legal/[key]')

  // BÚSQUEDA
  .add('/search/:key', 'search/[key]')
  .add('/budget/:price', 'budget/[price]')

  // PRIVATE ROUTES
  .add('/my-account', 'my-account')
  .add('/addresses', 'addresses')
  .add('/profile', 'profile')
  .add('/orders', 'orders')
  .add('/orders/:id', 'orders/[id]')
  .add('/favourites', 'favourites')

  // NOT FOUND
  .add('/404', 'pageNotFound')

  // CATEGORIAS / PRODUCTOS
  .add('/:product', '[entity]')
  // .add('/:product/:index', '[product]/[index]')
  .add('/comparador-de-productos/:name', 'comparador-de-productos/[name]');
