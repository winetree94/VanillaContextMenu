import { VanillaContextGroup } from './Group';
import { VanillaContextNode } from './Node';
import { LayoutLocation } from './Layout';
import { VanillaEventContainer } from './Event';

export interface VanillaContextOptions {
  getContextNodes: (e: Event) => VanillaContextNode[];
}

export class VanillaContext implements VanillaContextOptions {
  public element: HTMLElement;
  public eventContainer: VanillaEventContainer = new VanillaEventContainer();
  public getContextNodes: (e: Event) => VanillaContextNode[];
  public contextGroup: VanillaContextGroup | undefined;
  static Holder:VanillaContext[] = [];

  constructor(
    element: HTMLElement,
    getContextData: (e: Event) => VanillaContextNode[]
  ) {
    this.element = element;
    this.setListener(element);
    this.getContextNodes = getContextData;
    VanillaContext.Holder.push(this);
  }

  setListener(element: HTMLElement): void {
    this.eventContainer.add(
      {
        element: (document as unknown) as HTMLElement,
        event: 'click',
        listener: this.onWindowClick.bind(this)
      },
      {
        element: element,
        event: 'contextmenu',
        listener: this.onContextRequest.bind(this)
      }
    );
  }

  private onContextRequest(e: Event): void {
    VanillaContext.Holder.forEach((context) => {
      if (context !== this) {
        context.close();
      }
    });
    if (e.target) {
      e.preventDefault();
      if (
        this.contextGroup &&
        this.contextGroup.layout.contains(e.target as Node)
      ) {
        return;
      }
      this.removeOldContext();
      this.showContext(e);
    }
  }

  private onWindowClick(e: Event): void {
    if (e.target) {
      if (
        this.contextGroup &&
        this.contextGroup.layout.contains(e.target as Node)
      ) {
        return;
      }
      this.removeOldContext();
    }
  }

  private showContext(e: Event): void {
    this.contextGroup = new VanillaContextGroup(this.getContextNodes(e));
    this.element.appendChild(this.contextGroup.layout);
    this.contextGroup.layout.style.top =
      VanillaContext.getMousePosition(e).y + 'px';
    this.contextGroup.layout.style.left =
      VanillaContext.getMousePosition(e).x + 'px';
    this.contextGroup.show();
  }

  private removeOldContext(): void {
    if (this.contextGroup) {
      this.contextGroup.destroy();
      const parent = this.contextGroup.layout.parentElement;
      if (parent) {
        parent.removeChild(this.contextGroup.layout);
      }
    }
  }

  public close(): void {
    this.removeOldContext();
  }

  public destroy(): void {
    if (this.contextGroup) {
      this.contextGroup.destroy();
    }
    this.eventContainer.destroy();
    const idx = VanillaContext.Holder.indexOf(this);
    VanillaContext.Holder.splice(idx, 1);
  }

  private static getMousePosition(event: Event): LayoutLocation {
    const e = event as HTMLElementEventMap['contextmenu'];
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
