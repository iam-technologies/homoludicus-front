import _ from 'lodash';
import config from './config';

const getUrl = (img, size = 'original', folder = '') => {
  console.log('TCL: getUrl -> img', img);
  const attachment = _.get(img[0], 'attachment', '');
  return `${config.urlImages}${folder ? `${folder}/` : ''}original/${attachment}`;
};

const getHomeUrl = (img, size = 'original', folder = '') => {
  console.log('TCL: getUrl -> img', img);
  const attachment = _.get(img[0], 'attachment', '');
  return `${config.urlImages}${folder ? `${folder}/` : ''}${size}/${img}`;
};

const encodeBase64 = (image, callback) => {
  const reader = new FileReader();

  if (image) {
    reader.readAsDataURL(image);

    reader.onload = () => {
      callback(undefined, reader.result);
    };

    reader.onerror = (error) => {
      callback(error, undefined);
    };
  }
};

export default {
  encodeBase64,
  getUrl,
  getHomeUrl
};
