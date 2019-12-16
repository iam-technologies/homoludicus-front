export const LOGIN_CHANGE_SHOW = 'LOGIN_CHANGE_SHOW';


const show = (toMyAccount = false) => dispatch => dispatch({
  type: LOGIN_CHANGE_SHOW,
  show: true,
  toMyAccount
});


const hidden = () => dispatch => dispatch({
  type: LOGIN_CHANGE_SHOW,
  show: false
});


export default {
  show,
  hidden
};
