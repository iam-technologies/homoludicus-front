export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (color = '') => ({
  type: CHANGE_THEME,
  payload: { color }
});
