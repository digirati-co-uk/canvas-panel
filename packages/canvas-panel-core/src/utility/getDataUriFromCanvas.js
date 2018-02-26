import * as Manifesto from '@stephenwf-forks/manifesto.js';
import Manifold from './Manifold';

function getDataUriFromImages(images) {
  let infoUri = null;
  const firstImage = images[0];
  const resource = firstImage.getResource();
  const services = resource.getServices();
  if (services.length) {
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      let id = service.id;
      if (!id.endsWith('/')) {
        id += '/';
      }
      if (Manifesto.Utils.isImageProfile(service.getProfile())) {
        infoUri = id + 'info.json';
      }
    }
    return infoUri;
  }
  // no image services. return the image id
  return resource.id;
}

export default function getDataUriFromCanvas(canvas) {
  const p3Images = canvas.getP3Images();

  if (p3Images.length) {
    const firstP3Image = p3Images.shift();
    const service = firstP3Image.getImageService();
    if (service) {
      return service.getInfoUri();
    }
  }

  const images = canvas.getImages();
  if (images && images.length) {
    return getDataUriFromImages(images);
  }

  // Legacy IxIF
  const service = canvas.getService(Manifesto.ServiceProfile.ixif());
  if (service) {
    return service.getInfoUri();
  }
  // return the canvas id.
  return canvas.id;
}
