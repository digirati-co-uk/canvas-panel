function confine(requiredSize, sourceSize)
{
    if (sourceSize.width <= requiredSize.width && sourceSize.height <= requiredSize.height)
    {
        return sourceSize;
    }
    let scaleW = requiredSize.width / sourceSize.width;
    let scaleH = requiredSize.height / sourceSize.height;
    let scale = Math.min(scaleW, scaleH);
    return {
        width: Math.round((sourceSize.width * scale)),
        height: Math.round((sourceSize.height * scale))
    };
}

function setWidthHeightStyle(element, size){
    element.style.width = size.width + "px";
    element.style.height = size.height + "px";
}

function render(canvasPanel) {
    // clear out...
    while (canvasPanel.shadow.firstChild) {
        canvasPanel.shadow.removeChild(canvasPanel.shadow.firstChild);
    }
    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
    #wrapper {
        width:100%;
        height:100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .canvas {
        padding:0;
        margin:0;
        border:1px solid red;
    }

    img {
        border:0;
    }
    `;
    canvasPanel.shadow.appendChild(style);
    // At this point, this.canvasObj is a normalised, P3 Canvas resource in memory.
    // this render is just going to draw the canvas as big as it can 
    // in the parent CP container. We'll make lots of assumptions about what this
    // canvas is that a real CP couldn't make.
    
    // cp component itself is the viewport; we need to draw the canvas in it.
    // The viewport management of real CP is far more sophisticated than this
    const wrapper = document.createElement("div");
    wrapper.setAttribute('id', 'wrapper');
    canvasPanel.shadow.appendChild(wrapper);
    const canvasDiv = document.createElement("div");        
    canvasDiv.setAttribute('class', 'canvas');
    const imgTag = document.createElement("img");    
    imgTag.setAttribute('class', 'painting');

    // Real CP would not do this! It has no idea what's on the canvas!
    let imgResource = canvasPanel.canvasObj.items[0].items[0].body;
    imgTag.setAttribute("src", imgResource.id);
    // Also not dealing with any segments/regions:
    let computedStyle = window.getComputedStyle(canvasPanel);
    let viewportToFit = {
        width: parseInt(computedStyle.width) - 2,
        height: parseInt(computedStyle.height) - 2
    } // allow for the red border we added, 1+1
    console.log("must fit inside " + viewportToFit.width + " x " + viewportToFit.height);
    let canvasSize = confine(viewportToFit, canvasPanel.canvasObj);
    setWidthHeightStyle(canvasDiv, canvasSize);
    // in our very simple case this is also our image size
    setWidthHeightStyle(imgTag, canvasSize);
    // paint the image onto the canvas, simplistically
    canvasDiv.appendChild(imgTag);
    // put the canvas in the viewport
    wrapper.appendChild(canvasDiv);
}