import config from './config';


const getUrl = (img, size = 'original', folder = '') => {
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
  getUrl
};
