import { ContextNode } from './core/ContextNode';
import { VEventContainer } from './core/VEvent';
import { VUListElement, VUListElementParams } from './dom/VUListElement';
import { Log } from './misc/Log';

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
  public vUListElement: VUListElement | undefined;

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
    Log.d('context create');
  }

  setContainerEvents(): void {
    this.vContextEventContainer.addEventListener(
      'contextmenu',
      this.onContainerClick.bind(this)
    );
  }

  /**
   * context click action
   * this will invalidate other contexts and
   * display new context to dom
   */
  onContainerClick(e: Event): void {
    Log.d('onContainerClick');
    /* prevent showing default context menu */
    e.preventDefault();
    /* get mouse location */
    const { x, y } = VanillaContext.getMousePosition(e);
    Log.d('requested axis', x, y);

    /* if user clicked opened context location, will restart context */
    if (this.vUListElement) {
      this.vUListElement.onDestroy();
      this.vUListElement.ul.parentElement?.removeChild(this.vUListElement.ul);
    }

    /* create context root */
    this.vUListElement = new VUListElement({
      e: e,
      nodes: ((): ContextNode[] => {
        if (typeof this.options.nodes === 'function') {
          return this.options.nodes(e);
        } else {
          return this.options.nodes;
        }
      })()
    });
    Log.d('vUListElement created');

    /* attach context root to element and reflect mouse location on the ul */
    this.element.appendChild(this.vUListElement.ul);
    this.vUListElement.setLocation({ x, y });
    this.vUListElement.show();
  }

  setWindowEvents(): void {
    this.vWindowEventContainer.addEventListener('click', e => {
      if (
        this.vUListElement &&
        !this.vUListElement.ul.contains(e.target as Node)
      ) {
        this.vUListElement.onDestroy();
        this.vUListElement.ul.parentElement?.removeChild(this.vUListElement.ul);
      }
    });
  }

  show(e: MouseEvent): void {
    this.vUListElement = new VUListElement({
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

  public static closeAll(): void {
    return;
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
