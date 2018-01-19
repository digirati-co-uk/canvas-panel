import manifesto from 'manifesto.js';

export default function getDataUriFromCanvas(canvas) {
  const content = canvas.getContent();
  const images = canvas.getImages();
  if (content && content.length) {
    const annotation = content[0];
    const annotationBody = annotation.getBody();
    if (annotationBody.length) {
      return annotationBody[0].id;
    }
    return null;
  }
  else if (images && images.length) {
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
        if (manifesto.Utils.isImageProfile(service.getProfile())) {
          infoUri = id + 'info.json';
        }
      }
      return infoUri;
    }
    // no image services. return the image id
    return resource.id;
  }
  else {
    // Legacy IxIF
    const service = canvas.getService(manifesto.ServiceProfile.ixif());
    if (service) {
      return service.getInfoUri();
    }
    // return the canvas id.
    return canvas.id;
  }
}
