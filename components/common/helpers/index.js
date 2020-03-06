
const getBrowserUrl = (categorySelected, filters = {}) => {
  if (Object.keys(filters).length <= 0) {
    return `/shop/${categorySelected}`;
  }
  const url = Object.keys(filters).reduce((acc, value) => {
    return `${acc + value}=${filters[value]}&`;
  }, '?');
  return `/shop/${categorySelected}/${url}`;
};

export default getBrowserUrl;
