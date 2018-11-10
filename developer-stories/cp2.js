class CanvasPanel2 extends HTMLDivElement {

    static get observedAttributes() {
        return ['style'];
    }

    constructor(){
        super();
        console.log("CP2 constructor");
        this.shadow = this.attachShadow({mode: 'open'});
        this.canvasObj = null; 
    }
    
    connectedCallback() {
        console.log('connectedCallback()');
    }
    
    disconnectedCallback() {
        console.log('disconnectedCallback()');
    }
    
    adoptedCallback() {
        console.log('adoptedCallback');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Attribute ' + name + ' changed from ' + oldValue + ' to ' + newValue);
    }

    get canvas() {
        return this.canvasObj;
    }
    
    set canvas(value) {
        // set the Canvas directly as a blob of JSON
        this.canvasObj = value;
        render(this);
    } 
}

customElements.define('canvas-panel-2', CanvasPanel2, { extends: 'div' });
