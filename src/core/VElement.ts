import {
  Renderer,
  ClassRenderer,
  isClassRenderer,
  isFunctionRenderer,
  isStringRenderer,
  RendererInterface
} from './Renderer';

import { ContextNode } from './Node';
import { VLiElement } from '../dom/Li';

interface VLIElementParams {
  e: MouseEvent;
  parent: VUListElement;
  node: ContextNode;
}

class VLIElement {
  public li: HTMLLIElement = document.createElement('li');
  public params: VLIElementParams;
  public renderer: RendererInterface | undefined;
  public child: VUListElement | undefined;

  public constructor(params: VLIElementParams) {
    this.params = params;
    this.parseRenderer();
    this.setEvent();
    this.setChild();
  }

  public parseRenderer(): void {
    const renderer = this.params.node.renderer;
    if (isClassRenderer(renderer)) {
      this.renderer = new renderer();
      this.renderer.init({ e: this.params.e });
    } else if (isFunctionRenderer(renderer)) {
      const elementOrString = renderer({ e: this.params.e });
      if (elementOrString instanceof Node) {
        this.li.appendChild(elementOrString);
      } else if (typeof elementOrString === 'string') {
        this.li.innerHTML = elementOrString;
      } else {
        throw new Error(
          'Not supported renderer type, you have to return Node or String'
        );
      }
    } else if (isStringRenderer(renderer)) {
      this.li.innerHTML = renderer;
    }
  }

  public setEvent(): void {}

  public setChild(): void {}

  public destroy(): void {
    if (this.renderer?.destroy) {
      this.renderer.destroy();
    }
  }
}

interface VUListElementParams {
  e: MouseEvent;
  parent?: VLiElement;
  nodes: ContextNode[];
}

class VUListElement {
  public ul: HTMLUListElement = document.createElement('ul');
  public children: VLIElement[] = [];
  public params: VUListElementParams;
  constructor(params: VUListElementParams) {
    this.params = params;
    this.setChildren();
  }

  setChildren(): void {
    this.params.nodes.forEach(node => {
      const params: VLIElementParams = {
        e: this.params.e,
        parent: this,
        node: node
      };
      const vLi = new VLIElement(params);
      this.children.push(vLi);
    });
  }
}
