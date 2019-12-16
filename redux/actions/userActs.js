import { api } from '../../serverServices';
import { isClient } from '../../serverServices/utils';

export const USER_BEGIN = 'USER_BEGIN';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const USER_REMOVE = 'USER_REMOVE';


const userBegin = () => ({ type: USER_BEGIN });

const userSuccess = user => ({
  type: USER_SUCCESS,
  user
});

const userFailure = error => ({
  type: USER_FAILURE,
  error
});


const getUser = () => (dispatch) => {
  dispatch(userBegin());

  api.users.getById((error, res) => {
    if (res) {
      if (isClient && window.ga) window.ga('set', 'userId', res.data._id);
      return dispatch(userSuccess(res.data));
    }

    return dispatch(userFailure(error.data));
  });
};

const removeUser = () => (dispatch) => {
  api.users.removeSession();

  dispatch({ type: 'IS_LOGIN', login: false });

  dispatch({ type: 'LOGIN_CHANGE_SHOW', show: false });

  return dispatch({ type: USER_REMOVE });
};


export default {
  getUser,
  removeUser
};
