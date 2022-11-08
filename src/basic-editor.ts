export class BasicEditor extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Editor connected');
        this.innerHTML = '<h1>Welcome to Editor</h1>'
    }
    
    disconnectedCallback() {
        console.log('Editor disconnected');
    }

    adoptedCallback() {
        console.log('Editor adopted');
    }

    attributeChangedCallback(name: any, oldValue: any, newValue: any) {
        console.log('Editor attributes changed.', name, oldValue, newValue);
    }
}

customElements.define("basic-editor", BasicEditor);