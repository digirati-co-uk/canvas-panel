class CanvasPanel1 extends HTMLDivElement {

    static get observedAttributes() {
        return ['data-canvas-uri', 'data-partof-uri', 'style'];
    }

    constructor(){
        super();
        console.log("CP1 constructor");
        this.initialised = false;
        this.shadow = this.attachShadow({mode: 'open'});
        this.canvasUri = null; // the id of the canvas
        this.partOfUri = null; // a resource in which the canvas may be found, if not dereferenceable
        this.canvasObj = null; 
        this.partOf = null; 
    }
    
    connectedCallback() {
        console.log('connectedCallback()');
        this.readAttrs();
    }
    
    disconnectedCallback() {
        console.log('disconnectedCallback()');
    }
    
    adoptedCallback() {
        console.log('adoptedCallback');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if(this.initialised){
            console.log('Attribute ' + name + ' changed from ' + oldValue + ' to ' + newValue);
            this.readAttrs();
        }
    }



    async readAttrs() {
        let newPartOfUri = this.getAttribute("data-partof-uri");
        this.canvasUri = this.getAttribute("data-canvas-uri");
        if(this.partOfUri != newPartOfUri){
            this.partOfUri = newPartOfUri;
            this.partOf = await this.loadResource(this.partOfUri);
        }
        if(this.partOf == null) {
            this.canvasObj = await this.loadResource(this.canvasUri);
        } else {
            this.canvasObj = this.partOf.items.find(c => c.id == this.canvasUri);
        }
        render(this);
        this.initialised = true;
    }

    // so... should this be in here at all? 
    // Or does any fetching of resources take place externally...
    // but then, how does the consumer of CP follow links to more stuff?
    // notify the consumer that there is more stuff, let them load it, then give it back?
    async loadResource(uri){
        let res = await fetch(uri);
        let asJson = await res.json();
        return asJson;
    }

}

customElements.define('canvas-panel-1', CanvasPanel1, { extends: 'div' });


