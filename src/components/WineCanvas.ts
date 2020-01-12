import { WebComponent, createTemplate } from './WebComponent';

class WineCanvas extends WebComponent {
  _root = this.attachShadow({ mode: 'open' });

  constructor() {
    super();
    this._root.appendChild(
      createTemplate(`
       <input type="button" value="button">
    `)
    );
  }

  onButtonClicked(e: Event) {
    console.log(e);
  }

  template(): string {
    return `
      <div>
        <input type="button" value="button">
      </div>
    `;
  }

  connectedCallback() {
    console.log('connected');
  }

  disconnectedCallback() {
    console.log('disconnected');
  }
}

WineCanvas.register();
