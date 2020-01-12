export interface VElementOptions {
  id?: string;
  children: VElementContructor[];
  classList?: string[];
  style?: object;
}

type Attribute = {
  key: string;
  value: string;
};

export abstract class VElement implements VElementOptions {
  public abstract tag: string;
  public style?: object;
  public classList?: string[];
  public id?: string;
  public attributes?: { [key: string]: string };
  public children: VElementContructor[] = [];

  private dom = '';

  public abstract render(): HTMLElement;

  private watcher = (): null => {
    return null;
  };

  public create(): void {
    const element = document.createElement(this.tag);
  }
}

function createElement(
  tag: string,
  options?: object,
  ...children: VElement[]
): void {}

interface VElementContructor {
  new (): VElement;
}

export function render(
  vElementConstructor: VElementContructor,
  root: HTMLElement
): void {
  const vElement = new vElementConstructor();
  const element = document.createElement(vElement.tag);

  if (vElement.style) {
    Object.assign(element.style, vElement.style);
  }

  if (vElement.attributes) {
    for (const key in vElement.attributes) {
      element.setAttribute(key, vElement.attributes[key]);
    }
  }

  root.appendChild(element);
  vElement.children?.forEach(childElement => {
    render(childElement, element);
  });
}
