
const allowedTextKeys = `qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789 \`-=~!@#$%^&*()_+{}[]|\:'";,./<>?`;
// const allowedTextKeys = '0123456789';
// const specialKeys = ' Shift Tab CapsLock Control Meta Alt Enter';
// const formatingKeys = 'Delete Backspace Clear';
// const navigationKeys = 'ArrowUp ArrowDown ArrowRight ArrowLeft Home End PageUp PageDown';

let currentLine: HTMLElement;

export class BasicEditor extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        console.log('Editor connected');

        /**
         * Tabindex is mandatory to capture the keyboard events
         */
        this.setAttribute('tabindex', "0");

        this.enterNewLine();
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
            let previousActive = <HTMLElement>currentLine.querySelector('span.active');
            if (previousActive?.nodeName === 'SPAN') {
                previousActive?.classList.remove('active');
                let _span = document.createElement('span');
                _span.classList.add('active');
                if (event.key === ' ') {
                    _span.innerHTML = '&nbsp;';
                } else {
                    _span.innerHTML = event.key;
                }

                // _span.after(previousActive);
                currentLine.insertBefore(_span, previousActive.nextSibling)
            } else {
                if (event.key === ' ') {
                    currentLine.innerHTML = '<span class="active">&nbsp;</span>'
                } else {
                    currentLine.innerHTML = `<span class="active">${event.key}</span>`
                }
            }
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

    private enterNewLine() {
        let divElement: HTMLDivElement = document.createElement('div');
        divElement.classList.add('line');
        let _span = document.createElement('span');
        _span.classList.add('active');
        _span.classList.add('line-start');
        _span.innerHTML = ' ';
        divElement.append(_span);
        currentLine = divElement;
        this.appendChild(divElement);
    }

}

customElements.define("basic-editor", BasicEditor);