import _ from 'lodash';

// Check if there are exceptions and apply them.
export default (item, config) => {
  const exceptions = _.get(item, 'attributesException', []);
  const itemsConfig = Object.keys(config);
  const exceptionApply = [];

  if (exceptions.length > 0 && itemsConfig.length > 0) {
    let notAvailable = '';

    exceptions.forEach((exception) => {
      const { attributes } = exception;

      // filtrar para obtener los atributos que se aplican de una excepción
      const filter = attributes.filter((a) => {
        const prop = itemsConfig.filter(f => f === a.id);

        if (prop.length > 0 && config[prop[0]].key === a.key) return true;

        return false;
      });

      // Si todos los atributos de una excepción se aplican
      if (filter.length === attributes.length) {
        // Comprobar si esta disponible o no esa combinación y si existe precio.
        if (exception.available && _.get(exception, 'price', '') !== '') {
          exceptionApply.push(exception);

          // Si no está disponible se indica al usuario.
        } else if (!exception.available) {
          notAvailable = 'La configuración actual no está disponible.';
        }
      }
    });

    // Retornar que no está disponible la combinación.
    if (notAvailable) return notAvailable;
  }

  // retornamos las excepciones que se aplican o null si no hay.
  return exceptionApply.length > 0 ? exceptionApply : null;
};
