import { isClient } from '../serverServices/utils';

const webpSupport = async function supportsWebp() {
  if (isClient && !window.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';

  if (isClient) {
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(() => true, () => false);
  }
};

export { webpSupport };
