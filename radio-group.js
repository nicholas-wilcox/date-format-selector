const radioGroupTemplate = document.getElementById('radio-group-template');
const radioInputTemplate = document.getElementById('radio-input-template');

/**
 * A simple vanilla web component to handle radio groups.
 *
 * Attributes:
 * - data-values: comma-separated list of values, one per radio input.
 * - name: passed to the `name` attribute in each radio input.
 *
 * Dispatches a custom 'radioGroupInput' event that triggers on the radio input
 * children's 'input' events, with a detail object that specifies the newly selected
 * values.
 *
 * A 'Clear' button appears when an option is selected, which will reset the radio group.
 */
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
    this.dispatchEvent(
      new CustomEvent(
        'radioGroupInput',
        {
          bubbles: true,
          detail: { name: this.name, value: value }
        }
      )
    );
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
