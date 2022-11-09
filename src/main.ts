import './style.css'
import './basic-editor';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <basic-editor 
    tabindex="0" 
    focus="true" 
    initial-message="Kindly, write here..." 
    tab-force-focus="false" 
    focusout-force-focus="false"
    disable-next-line="false"
    disabled="false">
  </basic-editor>
`;
