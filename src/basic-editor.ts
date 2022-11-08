
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

        this.animatedType('Kindly, write here...');
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
                    currentLine.querySelector('span.active')?.classList.remove('active');
                    this.enterNewLine();
                break;
        }
    }

    private formatingKeys(event: KeyboardEvent) {
        switch (event.key) {
            case 'Delete':
                let currentChar = currentLine.querySelector('span.active');
                let nextChar = currentChar?.nextSibling;
                if (nextChar?.nodeName === 'SPAN') {
                    currentLine.removeChild(nextChar);
                }

                this.checkAndRemoveLine();
                break;
            case 'Backspace':
                let currentActiveChar = currentLine.querySelector('span.active');
                let prevChar = <HTMLElement>currentActiveChar?.previousSibling;
                // 
                if (
                    currentActiveChar?.nodeName === 'SPAN' &&
                    (
                        (
                            this.children[0] !== currentLine &&
                            currentLine.children[0] !== currentActiveChar) ||
                        (
                            currentLine.children.length > 1
                            && currentLine.children[0] !== currentActiveChar
                        )
                    )) {
                    currentLine.removeChild(currentActiveChar);
                    if (prevChar?.nodeName === 'SPAN') {
                        prevChar.classList.add('active');
                    }
                }
                this.checkAndRemoveLine();
                break;
            case 'Clear':
                break;
            case 'Escape':
                this.removeAllRangeSelection();
                break;
            default:
                break;
        }
    }

    private handleNavigation(event: KeyboardEvent) {

        const activeElement = <HTMLElement>currentLine.querySelector('span.active');
        switch (event.key) {
            case 'ArrowUp':
                let previousLineElement = <HTMLElement>currentLine.previousSibling;

                if (previousLineElement?.nodeName === 'DIV') {
                    activeElement?.classList.remove('active');
                    let childIndex = this.findTheChildIndex(currentLine, activeElement);
                    currentLine = previousLineElement;
                    if (currentLine.children[childIndex]) {
                        currentLine.children[childIndex].classList.add('active');
                    } else {
                        currentLine.children[currentLine.children.length - 1].classList.add('active');
                    }
                }
                break;
            case 'ArrowDown':
                let nextLineElement = <HTMLElement>currentLine.nextSibling;
                if (nextLineElement?.nodeName === 'DIV') {
                    activeElement?.classList.remove('active');
                    let childIndex = this.findTheChildIndex(currentLine, activeElement);
                    currentLine = nextLineElement;
                    if (currentLine.children[childIndex]) {
                        currentLine.children[childIndex].classList.add('active');
                    } else {
                        currentLine.children[currentLine.children.length - 1].classList.add('active');
                    }
                }
                break;
            case 'ArrowRight':
                let nextElement = <HTMLElement>(activeElement?.nextSibling);
                if (nextElement?.nodeName === 'SPAN') {
                    activeElement?.classList.remove('active');
                    nextElement?.classList.add('active');
                }
                break;
            case 'ArrowLeft':
                let previousElement = <HTMLElement>(activeElement?.previousSibling);
                if (previousElement?.nodeName === 'SPAN') {
                    activeElement?.classList.remove('active');
                    previousElement?.classList.add('active');
                }
                break;
            case 'Home':
                activeElement?.classList.remove('active');
                currentLine.children[0].classList.add('active');
                break;
            case 'End':
                activeElement?.classList.remove('active');
                currentLine.children[currentLine.children.length - 1].classList.add('active');
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

    private checkAndRemoveLine() {
        if (currentLine.children.length <= 1 && this.children.length !== 1) {
            this.removeChild(currentLine);
            currentLine = <HTMLElement>this.children[this.children.length - 1];
            currentLine.children[currentLine.children.length - 1].classList.add('active');
        }
        if (this.children.length === 0) {
            this.enterNewLine();
        }
    }

    private findTheChildIndex(parent: HTMLElement, child: HTMLElement) {
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i] === child) {
                return i;
            }
        }
        return -1;
    }

    private removeAllRangeSelection() {
        let _selection = window.getSelection();
        _selection?.removeAllRanges();
    }

    private dispatchKeyboardkeys(txt: string, isEVentKey: boolean = false, eventInstance?: HTMLElement) {
        if (isEVentKey) {
            (eventInstance || this).dispatchEvent(new KeyboardEvent('keyup', { 'key': txt }));
        } else {
            txt.split('').forEach((ch: string) => {
                (eventInstance || this).dispatchEvent(new KeyboardEvent('keyup', { 'key': ch }));
            });
        }
    }

    private animatedType(txt: string = 'Kindly, write here...', delay: number = 100) {
        let typeChars = txt.split('');
        let counter = 0;
        let intervalChrs = setInterval(() => {
            this.dispatchKeyboardkeys(typeChars[counter]);
            ++counter;
            if (counter >= typeChars.length) {
                clearInterval(intervalChrs);
            }
        }, delay);
    }

}

customElements.define("basic-editor", BasicEditor);