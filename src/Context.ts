import { VanillaContextGroup } from './Group';
import { VanillaContextNode } from './Node';
import { LayoutLocation } from './Layout';

export class VanillaContext {
  public contextGroup: VanillaContextGroup;
  public element: HTMLElement;
  public nodes: VanillaContextNode[] = [];

  constructor(element: HTMLElement, nodes: VanillaContextNode[]) {
    this.element = element;
    this.nodes = nodes;
    this.contextGroup = new VanillaContextGroup(nodes);
    element.appendChild(this.contextGroup.layout);
    this.setListener(element);
  }

  setListener(element: HTMLElement): void {
    document.addEventListener('click', this.onWindowClick.bind(this));
    element.addEventListener('contextmenu', this.onContextRequest.bind(this));
  }

  onContextRequest(e: HTMLElementEventMap['contextmenu']): void {
    e.preventDefault();
    if (e.target) {
      const isContain = this.contextGroup.layout.contains(e.target as Node);
      if (!isContain) {
        this.removeOldContext();
        this.showContext(e);
      }
    }
  }

  onWindowClick(e: Event): void {
    if (e.target) {
      const isContain = this.contextGroup.layout.contains(e.target as Node);
      if (!isContain) {
        this.removeOldContext();
      }
    }
  }

  showContext(e: HTMLElementEventMap['contextmenu']): void {
    this.contextGroup = new VanillaContextGroup(this.nodes);
    this.element.appendChild(this.contextGroup.layout);
    this.contextGroup.layout.style.top = this.getMousePosition(e).y + 'px';
    this.contextGroup.layout.style.left = this.getMousePosition(e).x + 'px';
    this.contextGroup.show();
  }

  removeOldContext(): void {
    if (this.contextGroup) {
      this.contextGroup.destroy();
      const parent = this.contextGroup.layout.parentElement;
      if (parent) {
        parent.removeChild(this.contextGroup.layout);
      }
    }
  }

  getMousePosition(e: HTMLElementEventMap['contextmenu']): LayoutLocation {
    let posx = 0;
    let posy = 0;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    };
  }
}
