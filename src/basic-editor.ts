
const allowedTextKeys = `qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789 \`-=~!@#$%^&*()_+{}[]|\:'";,./<>?`;
// const allowedTextKeys = '0123456789';
// const specialKeys = ' Shift Tab CapsLock Control Meta Alt Enter';
// const formatingKeys = 'Delete Backspace Clear';
// const navigationKeys = 'ArrowUp ArrowDown ArrowRight ArrowLeft Home End PageUp PageDown';

export class BasicEditor extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Editor connected');
        this.innerHTML = '<h1>Welcome...</h1>'

        /**
         * Tabindex is mandatory to capture the keyboard events
         */
        this.setAttribute('tabindex', "0");
        this.initEvents();
        this.focus();
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

    private initEvents() {
        this.addEventListener('keyup', (e: KeyboardEvent) => this.keyupEvent(e))
    }

    private keyupEvent(e: KeyboardEvent) {
        console.log('Editor Capture keyboard keyup event:- ', e, e.key);
        this.handleText(e);
        this.handleNavigation(e);
        this.formatingKeys(e);
        this.handleSpecialKeys(e);

    }

    private handleText(event: KeyboardEvent) {
        if (allowedTextKeys.includes(event.key)) {
            this.innerHTML += `${event.key}`;
        }
    }

    private handleSpecialKeys(event: KeyboardEvent) {
        switch (event.key) {
            case 'Enter':
                break;
        }
    }

    private formatingKeys(event: KeyboardEvent) {
        switch (event.key) {
            case 'Delete':
                break;
            case 'Backspace':
                break;
            case 'Clear':
                break;
            case 'Escape':
                break;
            default:
                break;
        }
    }

    private handleNavigation(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
                break;
            case 'ArrowDown':
                break;
            case 'ArrowRight':
                break;
            case 'ArrowLeft':
                break;
            case 'Home':
                break;
            case 'End':
                break;
            case 'PageUp':
                break;
            case 'PageDown':
                break;
            default:
                break;
        }
    }

}

customElements.define("basic-editor", BasicEditor);