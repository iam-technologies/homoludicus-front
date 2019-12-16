import { isClient } from '../../serverServices/utils';

export const UPDATE_WINDOW_RESIZE = 'UPDATE_WINDOW_RESIZE';


const update = (dispatch, oldStatus) => {
  const { screen } = oldStatus().windowResize;
  const { innerWidth } = window;

  if (innerWidth <= 767 && screen !== 'xs') {
    return dispatch({
      type: UPDATE_WINDOW_RESIZE,
      payload: { screen: 'xs' }
    });
  }

  if (innerWidth > 767 && innerWidth <= 1023 && screen !== 'sm') {
    return dispatch({
      type: UPDATE_WINDOW_RESIZE,
      payload: { screen: 'sm' }
    });
  }

  if (innerWidth > 1023 && screen !== 'lg') {
    return dispatch({
      type: UPDATE_WINDOW_RESIZE,
      payload: { screen: 'lg' }
    });
  }

  return null;
};


const listener = () => (dispatch, oldStatus) => {
  update(dispatch, oldStatus);

  if (isClient) window.addEventListener('resize', update.bind(this, dispatch, oldStatus));
};


export default { listener };
