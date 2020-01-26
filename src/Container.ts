import { ContextNode } from './core/ContextNode';
import { VEventContainer } from './core/VEvent';
import { VUListElement, VUListElementParams } from './dom/VUListElement';

export interface VanillaContextOptions {
  nodes: ContextNode[] | ((e: Event) => ContextNode[]);
}

export class VanillaContext {
  /* Multiple Context Holder */
  public static holder: VanillaContext[];
  /* Container element */
  public element: HTMLElement;
  /* Container element event conatiner */
  public vContextEventContainer: VEventContainer;
  /* document.body element event container */
  public vWindowEventContainer: VEventContainer;
  /* context options */
  public options: VanillaContextOptions;
  /* context root vElement */
  public ul: VUListElement | undefined;

  constructor(element: HTMLElement, options: VanillaContextOptions) {
    this.element = element;
    this.options = options;
    this.vContextEventContainer = new VEventContainer({
      element: this.element
    });
    this.vWindowEventContainer = new VEventContainer({
      element: document.body
    });
    this.setContainerEvents();
    this.setWindowEvents();
  }

  setContainerEvents(): void {
    this.vContextEventContainer.addEventListener(
      'contextmenu',
      this.onContainerClick.bind(this)
    );
  }

  onContainerClick(e: Event): void {
    const { x, y } = VanillaContext.getMousePosition(e);
  }

  setWindowEvents(): void {
    return;
  }

  show(e: MouseEvent): void {
    this.ul = new VUListElement({
      e: e,
      nodes: ((): ContextNode[] => {
        if (typeof this.options.nodes === 'function') {
          return this.options.nodes(e);
        } else {
          return this.options.nodes;
        }
      })()
    });
  }

  private static getMousePosition(event: Event): { x: number; y: number } {
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
