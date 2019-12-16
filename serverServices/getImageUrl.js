import _get from 'lodash/get';
import imgServices from './imgServices';
import { webpSupport } from '../utils/browser';


async function getImageUrl(content) {
  const img = _get(content, 'slider.0.imgUrl', '');
  const imgUrl = imgServices.getUrl(img);
  const imgPath = imgUrl.split('.');
  const imgFormat = imgPath.pop();

  const webpSup = await webpSupport();
  if (imgFormat === 'webp' && !webpSup) {
    return `${imgPath.join('.')}.jpg`;
  }
  return imgUrl;
}

export default getImageUrl;
