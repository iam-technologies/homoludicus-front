export const SHOW_NAV_MOBILE = 'SHOW_NAV_MOBILE';


const show = () => dispatch => dispatch({
  type: SHOW_NAV_MOBILE,
  payload: { show: true }
});

const hidden = () => dispatch => dispatch({
  type: SHOW_NAV_MOBILE,
  payload: { show: false }
});


export default {
  show,
  hidden
};
