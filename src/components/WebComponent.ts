export function createTemplate(templateLiteral: string): Node {
  const template: HTMLTemplateElement = document.createElement('template');
  template.innerHTML = templateLiteral;
  return template.content.cloneNode(true);
}

export abstract class WebComponent extends HTMLElement {
  public static register(): void {
    window.customElements.define(this.getComponentName(), this);
  }

  private static getComponentName(): string {
    const name = this.name;
    let result = '';
    for (let i = 0; i < name.length; i++) {
      if (name[i] === name[i].toUpperCase()) {
        result += i !== 0 ? '-' + name[i].toLowerCase() : name[i].toLowerCase();
      } else {
        result += name[i];
      }
    }
    return result;
  }
}
