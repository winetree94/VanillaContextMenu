import { VLIElementParams, VLIElement } from './VLIElement';
import { MouseLocation } from '../core/MouseLocation';
import { ContextNode } from '../core/ContextNode';
import { VElement, VElementParams } from "../core/VElement";

export interface VUListElementParams extends VElementParams {
  e: Event;
  parent?: VLIElement;
  nodes: ContextNode[];
}

export class VUListElement implements VElement {
  public ul: HTMLUListElement = document.createElement('ul');
  public children: VLIElement[] = [];
  public params: VUListElementParams;

  constructor(params: VUListElementParams) {
    this.params = params;
    this.setChildren();
    this.ul.className = 'vanilla-context-ul';
  }

  public onCreate(params: VElementParams) {

  }

  public getLayout() {
    return this.ul;
  }

  setChildren(): void {
    this.params.nodes.forEach(node => {
      console.log(node);
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

  public select(item: VLIElement): void {
    this.children.forEach(compare => {
      if (item !== compare) {
        compare.hideChild();
      }
    });
  }

  public show(): void {
    this.ul.classList.add('vanilla-context-ul-active');
  }

  public hide(): void {
    this.ul.classList.remove('vanilla-context-ul-active');
  }

  public onDestroy(): void {
    this.children.forEach(child => {
      child.onDestroy();
    });
  }
}
