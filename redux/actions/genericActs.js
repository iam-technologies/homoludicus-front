import api from '../../serverServices/api';

export const LOAD_GENERIC = 'LOAD_GENERIC';

const loadGeneric = doc => ({
  type: LOAD_GENERIC,
  payload: doc
});


const getGeneric = () => (dispatch) => {
  api.generic.getGeneric((error, res) => {
    if (res) {
      dispatch(loadGeneric(res.data));
    }
  });
};


export default getGeneric;
