import { VLIElementParams, VLIElement } from './VLIElement';
import { MouseLocation } from '../core/MouseLocation';
import { ContextNode } from '../core/ContextNode';
import { VElement, VElementParams } from '../core/VElement';
import { Log } from '../misc/Log';

export interface VUListElementParams extends VElementParams {
  e: Event;
  parent?: VLIElement;
  nodes: ContextNode[];
}

/**
 * Virtual UList Element
 */
export class VUListElement implements VElement {
  public ul: HTMLUListElement = document.createElement('ul');
  public children: VLIElement[] = [];
  public params: VUListElementParams;

  constructor(params: VUListElementParams) {
    Log.l('VUListElement');
    this.params = params;
    this.setChildren();
    this.ul.className = 'vanilla-context-ul';
  }

  public getElement() {
    return this.ul;
  }

  setChildren(): void {
    this.params.nodes.forEach((node, index) => {
      const params: VLIElementParams = {
        e: this.params.e,
        index: index,
        parent: this,
        node: node
      };
      const vLi = new VLIElement(params);
      this.getElement().appendChild(vLi.getElement());
      this.children.push(vLi);
    });
  }

  public setLocation(location: MouseLocation): void {
    this.ul.style.top = location.y + 'px';
    this.ul.style.left = location.x + 'px';
  }

  public select(item: VLIElement): void {
    this.children[item.params.index].showChild();
  }

  public deselect(item: VLIElement): void {
    // this.children[item.params.index].hideChild();
  }

  public detach(): void {
    if (this.ul.parentElement) {
      this.ul.parentElement.removeChild(this.ul);
    }
  }

  public onDestroy(): void {
    this.children.forEach(child => {
      child.onDestroy();
    });
  }
}
