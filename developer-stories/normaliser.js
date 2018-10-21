export function normalise(resource, options){
    // Trivial and dangerous implementation...
    // uses thep2-p3 JS library, but assumes resource is always a manifest
    // passes it back if already P3
    // doesn't do any fixing up
    let ctx = resource['@context'];
    if(Array.isArray(ctx) && ctx.slice(-1)[0] == "http://iiif.io/api/presentation/3/context.json"){
        return resource;
    }
    let upgrader = new Upgrader(options);
    return upgrader.processResource(resource, true);
}