import { ContextNode } from './core/ContextNode';
import { VEventContainer } from './core/VEvent';
import { VUListElement, VUListElementParams } from './dom/VUListElement';
import { Log } from './misc/Log';

export interface VanillaContextOptions {
  nodes: ContextNode[] | ((e: Event) => ContextNode[]);
}

export class VanillaContext {
  /* Multiple Context Holder */
  public static Holder: VanillaContext[];
  /* Container element */
  public element: HTMLElement;
  /* Container element event conatiner */
  public events: VEventContainer;
  /* context options */
  public options: VanillaContextOptions;
  /* context root vElement */
  public context: VUListElement | undefined;

  constructor(element: HTMLElement, options: VanillaContextOptions) {
    this.element = element;
    this.options = options;
    this.events = new VEventContainer();
    this.setEvents();
    // VanillaContext.Holder.push(this);
    Log.d('context create');
  }

  setEvents(): void {
    this.events.addEventListener(
      this.element,
      'contextmenu',
      this.onContextRequested.bind(this)
    );
    this.events.addEventListener(
      document,
      'click',
      this.onWindowClicked.bind(this)
    );
  }

  /**
   * context click action
   * this will invalidate other contexts and
   * display new context to dom
   * @param e {Event} - right mouse click event.
   */
  onContextRequested(e: Event): void {
    Log.d('onContainerClick');
    /* prevent showing default context menu */
    e.preventDefault();
    /* get mouse location */
    const { x, y } = VanillaContext.getMousePosition(e);
    Log.d('requested axis', x, y);

    /* if user clicked opened context location, will restart context */
    if (this.context) {
      this.context.onDestroy();
    }

    /* create context root */
    this.context = new VUListElement({
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

    /* attach context root to element and reflect mouse location on the ul element */
    this.element.appendChild(this.context.getElement());
    this.context.setLocation({ x, y });
  }

  onWindowClicked(e: Event): void {
    if (this.context && !this.context.ul.contains(e.target as Node)) {
      this.context.onDestroy();
    }
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
