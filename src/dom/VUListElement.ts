import { VLIElementParams, VLIElement } from './VLIElement';
import { ContextNode } from '../core/ContextNode';

export interface VUListElementParams {
  e: MouseEvent;
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

  public destroy(): void {
    this.children.forEach(child => {
      child.destroy();
    });
  }
}
