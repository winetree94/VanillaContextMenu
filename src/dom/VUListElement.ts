import { VLIElementParams, VLIElement } from './VLIElement';
import { MouseLocation } from '../core/MouseLocation';
import { ContextNode } from '../core/ContextNode';

export interface VUListElementParams {
  e: Event;
  parent?: VLIElement;
  nodes: ContextNode[];
}

export class VUListElement {
  public ul: HTMLUListElement = document.createElement('ul');
  public children: VLIElement[] = [];
  public params: VUListElementParams;

  constructor(params: VUListElementParams) {
    this.params = params;
    this.setChildren();
    this.ul.className = 'vanilla-context-ul vanilla-context-ul-active';
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

  public setLocation(location: MouseLocation): void {
    this.ul.style.top = location.y + 'px';
    this.ul.style.left = location.x + 'px';
  }

  public destroy(): void {
    this.children.forEach(child => {
      child.destroy();
    });
  }
}
