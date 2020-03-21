import { ContextNode } from './core/ContextNode';
import { VEventContainer } from './core/VEvent';
import { VUListElement } from './dom/VUListElement';

export interface ContextNodeParams {
  api: VanillaContext;
  originEvent: Event;
}

export interface ContextGroupClassParams {
  api: VanillaContext;
  originEvent: Event;
}

export interface ContextItemClassParams {
  api: VanillaContext;
  originEvent: Event;
}

export interface ContextItemStyleParams {
  api: VanillaContext;
  originEvent: Event;
}

export interface ContextGroupStyleParams {
  api: VanillaContext;
  originEvent: Event;
}

export interface VanillaContextOptions {
  debug?: boolean;
  autoClose?: boolean;
  hideArrow?: boolean;
  customArrow?: string;
  groupStyle?: object | ((params: ContextGroupStyleParams) => object);
  itemStyle?: object | ((params: ContextItemStyleParams) => object);
  groupClasses?: string | ((params: ContextGroupClassParams) => string);
  itemClasses?: string | ((params: ContextItemClassParams) => string);
  nodes: ContextNode[] | ((params: ContextNodeParams) => ContextNode[]);
}

const defaultContextOptions: VanillaContextOptions = {
  autoClose: true,
  debug: true,
  nodes: []
};

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
    this.options = Object.assign(defaultContextOptions, options);
    this.events = new VEventContainer();
    this.setEvents();
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
   * display new context to the dom
   * @param e {Event} - right mouse click event.
   */
  onContextRequested(e: Event): void {
    /* prevent showing default context menu */
    e.preventDefault();

    /* if user request context inside opened context, will stop */
    if (this.context && this.context.ul.contains(e.target as Node)) {
      return;
    }

    /* if user clicked opened context location, will restart context */
    if (this.context) {
      this.context.onDestroy();
    }

    /* create context root */
    this.context = new VUListElement({
      context: this,
      e: e,
      nodes: ((): ContextNode[] => {
        if (typeof this.options.nodes === 'function') {
          return this.options.nodes({
            api: this,
            originEvent: e
          });
        } else {
          return this.options.nodes;
        }
      })()
    });

    /* attach context root to element and reflect mouse location on the ul element */
    this.element.appendChild(this.context.getElement());
    /* get Mouse position */
    const { x, y } = VanillaContext.getMousePosition(e);
    /* this will showing context and locate correct position */
    this.context.show();
    this.context.setLocation({ x, y });
  }

  onWindowClicked(e: Event): void {
    if (this.context && !this.context.ul.contains(e.target as Node)) {
      this.context.onDestroy();
    }
  }

  close(): void {
    if (this.context) {
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
