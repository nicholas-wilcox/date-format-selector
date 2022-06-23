const radioGroupTemplate = document.getElementById('radio-group-template');
const radioInputTemplate = document.getElementById('radio-input-template');

class RadioGroup extends HTMLElement {
  get name() {
    return this.getAttribute('name');
  }

  get values() {
    return this.dataset.values.split(',');
  }

  get header() {
    return this.shadowRoot.querySelector('#header');
  }

  get clearButton() {
    return this.shadowRoot.querySelector('#clearButton');
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(radioGroupTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.header.innerText = this.name;
    this.clearButton.addEventListener('click', () => {
      this.clear();
      this.update(undefined);
    });

    this.values.forEach(value => {
      const radioNode = this.createRadioInputNode(value);
      this.shadowRoot.appendChild(radioNode);
    });
  }

  update(value) {
    this.dispatchEvent(new CustomEvent('radioGroupInput', { detail: { name: this.name, value: value } }));
  }

  clear(shouldUpdate = false) {
    this.removeAttribute('selected');
    this.shadowRoot.querySelectorAll('input').forEach(input => input.checked = false);
  }

  createRadioInputNode(value) {
    const radioNode = radioInputTemplate.content.cloneNode(true);
    const radioInput = radioNode.querySelector('input');
    radioInput.setAttribute('name', this.name);
    radioInput.setAttribute('value', value);
    radioInput.addEventListener('input', () => {
      this.setAttribute('selected', '');
      this.update(value);
    });
    radioNode.querySelector('.radio-label').innerText = value;
    return radioNode;
  }
}

customElements.define('radio-group', RadioGroup);
