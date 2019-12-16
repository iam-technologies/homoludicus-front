
const ROUTES = [];

const addRoutes = (routes) => {
  ROUTES.push(...routes);
};

const getRoute = (id) => {
  const filter = ROUTES.filter(elem => elem._id === id);

  // if (filter.length > 0) return filter[0].url;
  if (filter.length > 0) {
    const path = filter[0].url;
    const pathLastSegment = `/${path.split('/').pop()}`;
    return pathLastSegment;
  }
  return '';
};

const isCategory = (url, routes) => {
  const category = routes.filter((elem) => {
    const categoryUrl = `/${elem.url.split('/').pop()}`;
    return categoryUrl === url;
  });

  if (category.length > 0) return category[0];

  return null;
};

export default {
  addRoutes,
  getRoute,
  isCategory,
  ROUTES
};
