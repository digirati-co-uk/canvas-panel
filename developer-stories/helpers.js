export function getThumbnail(resource, options){
    // Trivial implementation for discussion purposes; useless in real world.
    // just here to demonstrate what a helper library does.
    // see https://github.com/tomcrane/iiif-expts/blob/gh-pages/getthumbnail/iiif.js#L159
    // and http://tomcrane.github.io/iiif-expts/getthumbnail/
    // options is ignored, and we assume that resource has a thumbnail property
    // and that it is an image, and we just return its id.
    return resource.thumbnail[0].id;
}


export function getString(langMap, preflang){
    // Noddy impl, ignores args preflang (a list, probably)
    if(typeof langMap === 'string') return langMap; // not valid, but...
    let anyValue = null;
    for(let lang in langMap){
        anyValue = langMap[lang][0];
        break;
    }
    return anyValue;
}

export async function getTextForCanvasAsHtml(canvas){
    // Again, trivial
    // also - this shows a dependency issue
    // the helpers now wants to normalise...
    // so where does that live?

    // Does this belong in helpers? Should the caller be deciding this?

    // there are several things wrong with having this here...
    // There's no way a generic helper can decide this on its own. All sorts of things
    // need to be determined by business logic in the app...
    // The user may be offered the labels of the linked anno lists to choose from
    
    // also, this isn't processing W3C annos! (see normalise above)
    // skip over that for now...
    if(Array.isArray(canvas.annotations)){
        let response = await fetch(canvas.annotations[0].id);
        let oa_annos = await response.json();
        if(oa_annos.resources){
            let s = "";
            for(let i=0; i<oa_annos.resources.length; i++){
                let res = oa_annos.resources[i];
                if(res.resource && res.resource.chars){
                    s += res.resource.chars + "<br/>\r";
                }
            } 
            return s;
        }
    }
    return null;
}

export function getAnnotationCollections(canvas){
    return canvas.annotations || [];
}