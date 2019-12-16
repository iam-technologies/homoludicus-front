import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const devtools = (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__)
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f;

const makeStore = (initialState, options) => createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk), devtools)
);
export default makeStore;
