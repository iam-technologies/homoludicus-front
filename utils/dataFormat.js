import _ from 'lodash';
import currencyFormatter from 'currency-formatter';


// Obtener precio en el formato correcto.
const formatCurrency = (price, withoutSpace = false) => currencyFormatter.format(price, {
  symbol: '€',
  decimal: ',',
  thousand: '.',
  precision: price.toString().indexOf('.') !== -1 ? 2 : 0,
  format: withoutSpace ? '%v%s' : '%v %s'
});


// Obtener propiedades por defecto si el valor lo tiene habilitado.
const getDefaultProperties = (child, item) => {
  if (_.get(child, 'propertiesDefault', false)) {
    child.properties = item.properties;
  }

  return child;
};


// Obtener la clave correcta
const getPathKeyConfig = (item, isPack = false) => {
  if (isPack && item.refProduct) return item.keyPath;

  return item._id;
};

const backIdsPack = (item) => {
  if (item.indexOf('-') !== -1) return item.split('-');

  return item;
};

// Obtener Preview de la imagen a mostrar
const getPreviewImg = (item, elem) => {
  const img = _.get(elem, 'properties.img', '');

  if (!img) return _.get(item, 'properties.img', '');

  return img;
};


// Textos a mostrar en el carro para los atributos.
const getTextConfigCart = ({ product = {}, config = {} }, showImg = false) => {
  const configKeys = Object.keys(config);
  if (configKeys === 0) return [];

  const configArray = [];

  configKeys.forEach((elem) => {
    const obj = _.get(config, elem, {});

    if (obj.key) {
      const objType = _.get(obj, 'item.type', '');

      if (objType === 'image' && !showImg) return;

      const name = `${_.get(obj, 'item.name.es', '')} ${_.get(obj, 'item.refProduct.name.es', '')}`.trim();
      const value = objType === 'text' || objType === 'image' ?
        _.get(obj, 'key', '') : _.get(obj, 'value.name.es', '');

      if (!name && !value) return null;

      configArray.push({
        key: elem,
        value: `${name}: ${value}`
      });
    }
  });

  return configArray;
};

// Format text address
const getTextAddress = item => `${_.get(item, 'address', '')}, ${_.get(item, 'city', '')} (${_.get(item, 'country', '')}) ${_.get(item, 'codePostal', '')}`;


export default {
  backIdsPack,
  formatCurrency,
  getDefaultProperties,
  getPathKeyConfig,
  getPreviewImg,
  getTextAddress,
  getTextConfigCart
};
