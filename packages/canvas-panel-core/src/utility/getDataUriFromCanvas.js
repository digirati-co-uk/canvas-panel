import * as Manifesto from 'manifesto.js';
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
  // const external = new Manifold.ExternalResource(canvas, {});
  //
  // return external.dataUri;
  const content = canvas.getContent();
  let images = canvas.getImages();

  if (content && content.length) {
    const annotation = content[0];
    const annotationBody = annotation.getBody();

    if (annotation.getProperty('motivation') === 'painting' && annotationBody) {
      let infoUri = null;
      const service = annotationBody[0].__jsonld.service;
      let id = service.id;
      if (!id.endsWith('/')) {
        id += '/';
      }
      if (service.profile) {
        infoUri = id + 'info.json';
      }
      return infoUri;
    }

    if (annotationBody.length) {
      return annotationBody[0].id;
    }
  } else if (images && images.length) {
    return getDataUriFromImages(images);
  } else {
    // Legacy IxIF
    const service = canvas.getService(Manifesto.ServiceProfile.ixif());
    if (service) {
      return service.getInfoUri();
    }
    // return the canvas id.
    return canvas.id;
  }
}
