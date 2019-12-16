// const rootReducer = combineReducers(
//     {
//         pageReducer
//     }
// )

// export default rootReducer;
import { combineReducers } from 'redux';

// import { langTrans } from '../../components/Translation/reducer'; // uncomment
import showSearch from './showSearch';
import carts from './carts';
import configAttr from './configAttr';
import isLogin from './isLogin';
import navMobile from './navMobile';
import showCartPopup from './showCartPopup';
import showImgAttribute from './showImgAttribute';
import showLogin from './showLogin';
import user from './user';
import windowResize from './windowResize';
import pageReducer from './pageReducers';


export default combineReducers({
  carts,
  configAttr,
  isLogin,
  // langTrans, // uncomment
  navMobile,
  showCartPopup,
  showImgAttribute,
  showLogin,
  pageReducer,
  showSearch,
  user,
  windowResize
});
