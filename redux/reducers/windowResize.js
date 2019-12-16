import { UPDATE_WINDOW_RESIZE } from '../actions/windowResizeActs';

const initialState = { screen: 'lg' };

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WINDOW_RESIZE: {
      return { ...action.payload };
    }

    default: return state;
  }
};
