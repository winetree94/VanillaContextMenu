import { ContextNode } from '../core/ContextNode';
import { VanillaContext } from '../Container';
import { VEventContainer } from '../core/VEvent';
import { VUListElement } from './VUListElement';
import { VElement, VElementParams } from '../core/VElement';
import {
  RendererInterface,
  isClassRenderer,
  isFunctionRenderer,
  isStringRenderer
} from '../core/Renderer';
import { Log } from '../misc/Log';

export interface VLIElementParams extends VElementParams {
  context: VanillaContext;
  e: Event;
  index: number;
  parent: VUListElement;
  node: ContextNode;
}

export class VLIElement implements VElement {
  public li: HTMLLIElement = document.createElement('li');
  public events: VEventContainer = new VEventContainer();
  public params: VLIElementParams;
  public renderer: RendererInterface | undefined;
  public child: VUListElement | undefined;

  public constructor(params: VLIElementParams) {
    this.li.className = 'vanilla-context-li';
    this.params = params;
    this.parseRenderer();
    this.parseItemClass();

    this.parseStyle();
    this.parseClass();
    this.parseDisabled();
    this.setChild();
    this.setEvent();
  }

  public setChild(): void {
    if (this.params.node.children) {
      this.child = new VUListElement({
        context: this.params.context,
        e: this.params.e,
        parent: this,
        nodes: this.params.node.children
      });
      this.li.appendChild(this.child.getElement());
    }
  }

  public getElement(): HTMLElement {
    return this.li;
  }

  /**
   * Parse custom renderer user provided
   */
  public parseRenderer(): void {
    const renderer = this.params.node.renderer;
    if (isClassRenderer(renderer)) {
      this.renderer = new renderer();
      this.renderer.init({
        api: this.params.context,
        originEvent: this.params.e
      });
    } else if (isFunctionRenderer(renderer)) {
      const elementOrString = renderer({
        api: this.params.context,
        originEvent: this.params.e
      });
      if (elementOrString instanceof Node) {
        this.li.appendChild(elementOrString);
      } else if (typeof elementOrString === 'string') {
        this.li.innerHTML = elementOrString;
      } else {
        throw new Error(
          'Unsupported renderer type, you have to return Node or String'
        );
      }
    } else if (isStringRenderer(renderer)) {
      this.li.innerHTML = renderer;
    } else {
      throw new Error('Unsupported renderer type');
    }

    const { children } = this.params.node;

    /* If node has child nodes, create arrow icon */
    if (children) {
      const icon = document.createElement('div');
      icon.classList.add('vanilla-context-icon');
      this.li.appendChild(icon);
    }
  }

  public setEvent(): void {
    this.events.addEventListener(this.li, 'click', this.onClick.bind(this));
    this.events.addEventListener(
      this.li,
      'mouseover',
      this.onMouseOver.bind(this)
    );
    this.events.addEventListener(
      this.li,
      'mouseout',
      this.onMouseOut.bind(this)
    );
  }

  public onClick(e: Event): void {
    if (e.target === this.li && this.params.node.onClick) {
      this.params.node.onClick({
        api: this.params.context,
        event: e,
        originEvent: this.params.e
      });

      if (this.params.context.options.autoClose) {
        this.params.context.close();
      }
    }
  }

  /**
   * mouse over event of li.
   * if children exist, this will create a child ul element
   */
  public onMouseOver(e: Event): void {
    this.li.classList.add('hover');
    this.params.parent.select(this);
  }

  /**
   * mouse out event of li
   */
  public onMouseOut(e: Event): void {
    this.li.classList.remove('hover');
  }

  public openChild(): void {
    const { top, left, width } = this.params.parent.ul.getBoundingClientRect();
    this.child?.show();
    this.child?.setLocation({ x: left + width - 1, y: top });
  }

  public closeChild(): void {
    this.child?.hide();
  }

  public onDestroy(): void {
    this.renderer?.destroy();
    this.li.parentElement?.removeChild(this.li);
  }

  private parseItemClass(): void {
    const { itemClasses } = this.params.context.options;
    if (!itemClasses) {
      return;
    }
    if (typeof itemClasses === 'function') {
      const classList = itemClasses({
        api: this.params.context,
        originEvent: this.params.e
      });
      this.li.className = `${this.li.className} ${classList}`;
    } else {
      this.li.className = `${this.li.className} ${itemClasses}`;
    }
  }

  /**
   * parse disabled property
   */
  private parseDisabled(): void {
    const { disabled } = this.params.node;

    /* if user not provide disabled property, will stop */
    if (!disabled) {
      return;
    }

    /* if property type is boolean */
    if (typeof disabled === 'boolean') {
      this.li.classList.add('disabled');
      /* if property type is function */
    } else if (
      typeof disabled === 'function' &&
      disabled({
        api: this.params.context,
        originEvent: this.params.e
      })
    ) {
      this.li.classList.add('disabled');
    }
  }

  /**
   * parse height property
   */
  private parseStyle(): void {
    const { style } = this.params.node;
    if (!style) {
      return;
    }
    /* If user provided custom height */
    if (typeof style === 'function') {
      Object.assign(
        this.li.style,
        style({
          api: this.params.context,
          originEvent: this.params.e
        })
      );
    } else {
      Object.assign(this.li.style, style);
    }
  }

  private parseClass(): void {
    const { classes } = this.params.node;
    if (!classes) {
      return;
    }
    if (typeof classes === 'function') {
      const classList = classes({
        api: this.params.context,
        originEvent: this.params.e
      });
      this.li.className = `${this.li.className} ${classList}`;
    } else {
      this.li.className = `${this.li.className} ${classes}`;
    }
  }
}
