// import { Params } from './Params';
import { LifeCycle } from './LifeCycle';
import { Params } from './Params';

export interface RendererInterface extends LifeCycle {
  init: (params: Params) => void;
  getElement: () => Element;
}

function isConstructor(renderer: Renderer): renderer is ConstructorRenderer {
  return 'init' in renderer;
}

function isFunction(renderer: Renderer): renderer is FunctionRenderer {
  return typeof renderer === 'function';
}

export function parseRenderer(
  Renderer: Renderer,
  params: Params
): HTMLCollection {
  const container: HTMLTemplateElement = document.createElement('template');
  if (isConstructor(Renderer)) {
    const rendered = new Renderer();
    rendered.init(params);
    const root = rendered.getElement();
    container.append(root);
  } else if (isFunction(Renderer)) {
    const rendered = Renderer();
    if (rendered instanceof HTMLCollection) {
    }
  } else if (typeof Renderer === 'string') {
  } else {
    throw new Error('Unsupported renderer');
  }
  return container.content.children;
}

// export function parseHTMLString(string: string): Element {
//   const template: HTMLTemplateElement = document.createElement('template');
//   template.innerHTML = string;
//   return template.content;
// }

// export type ConstructorRenderer = new () => RendererInterface;

// export type FunctionRenderer = () => string | Element;

// export type Renderer = ConstructorRenderer | FunctionRenderer | Element;

export class Renderer implements RendererInterface, LifeCycle {
  public rawRenderer: RendererInterface | string | (() => string | HTMLElement);
  constructor(
    renderer: RendererInterface | string | (() => string | HTMLElement)
  ) {
    this.rawRenderer = renderer;
  }
  getElement() {}
  init: (params: Params) => void;
  destroy(): void {}
}
