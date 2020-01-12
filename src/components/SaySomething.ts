const template = document.createElement('template');

template.innerHTML = `
  <style>
    h2 {
      background-color: blue;
    }
  </style>
  <h2>Hello: <span>World</span></h2>
`;

class SaySomething extends HTMLElement {
  _shadowRoot: ShadowRoot;
  _color: string | undefined;
  _text: string | undefined;

  constructor() {
    super();
    console.log('SaySomething');
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('say-something', SaySomething);
