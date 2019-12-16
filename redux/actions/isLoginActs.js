// Actions change if user is logged in or not.
const change = login => dispatch => dispatch({
  type: 'IS_LOGIN',
  login
});


export default { change };
