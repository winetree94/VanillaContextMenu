import { VanillaContext } from '../Container';
import { VLIElementParams, VLIElement } from './VLIElement';
import { MouseLocation } from '../core/MouseLocation';
import { ContextNode } from '../core/ContextNode';
import { VElement, VElementParams } from '../core/VElement';
import { Log } from '../misc/Log';

export interface VUListElementParams extends VElementParams {
  context: VanillaContext;
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
    this.params = params;
    this.setChildren();
    this.ul.className = 'vanilla-context-ul';
    this.parseGroupClass();
  }

  public getElement() {
    return this.ul;
  }

  setChildren(): void {
    this.params.nodes.forEach((node, index) => {
      const params: VLIElementParams = {
        context: this.params.context,
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

  public show(): void {
    this.ul.classList.add('active');
  }

  public hide(): void {
    this.ul.classList.remove('active');
  }

  public select(vLi: VLIElement): void {
    this.children.forEach(compare =>
      vLi === compare ? vLi.openChild() : compare.closeChild()
    );
  }

  public setLocation(location: MouseLocation): void {
    this.ul.style.top = location.y + 'px';
    this.ul.style.left = location.x + 'px';
  }

  public onDestroy(): void {
    this.ul.parentElement?.removeChild(this.ul);
    this.children.forEach(child => {
      child.onDestroy();
    });
  }

  private parseGroupClass() {
    const { groupClasses } = this.params.context.options;
    if (!groupClasses) {
      return;
    }
    if (typeof groupClasses === 'function') {
      const classes = groupClasses({
        api: this.params.context,
        originEvent: this.params.e
      });
      this.ul.className = `${this.ul.className} ${classes}`;
    } else {
      this.ul.className = `${this.ul.className} ${groupClasses}`;
    }
  }
}
