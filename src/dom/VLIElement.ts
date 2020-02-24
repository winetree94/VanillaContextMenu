import { ContextNode } from '../core/ContextNode';
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
    Log.d('VLiElement');
    this.li.className = 'vanilla-context-li';
    this.params = params;
    this.parseRenderer();
    this.setChild();
    this.setEvent();
  }

  public setChild(): void {
    if (this.params.node.children) {
      this.child = new VUListElement({
        e: this.params.e,
        parent: this,
        nodes: this.params.node.children
      });
      this.li.appendChild(this.child.getElement());
    }
  }

  public getElement() {
    return this.li;
  }

  /**
   * Parse custom renderer user provided
   */
  public parseRenderer(): void {
    const renderer = this.params.node.renderer;
    if (isClassRenderer(renderer)) {
      this.renderer = new renderer();
      this.renderer.init({ e: this.params.e });
    } else if (isFunctionRenderer(renderer)) {
      const elementOrString = renderer({ e: this.params.e });
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
    /* If node has child nodes, create arrow icon */
    if (this.params.node.children) {
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
      Log.d('onClick');
      this.params.node.onClick(this.params.e);
    }
  }

  /**
   * mouse over event of li.
   * if children exist, this will create a child ul element
   */
  public onMouseOver(e: Event): void {
    Log.d('onMouseOver');
    this.li.classList.add('hover');
    this.params.parent.select(this);
  }

  /**
   * mouse out event of li
   */
  public onMouseOut(e: Event): void {
    Log.d('onMouseOut');
    this.li.classList.remove('hover');
  }

  public openChild(): void {
    const { top, left, width } = this.li.getBoundingClientRect();
    this.child?.show();
    this.child?.setLocation({ x: left + width, y: top });
  }

  public closeChild(): void {
    this.child?.hide();
  }

  public onDestroy(): void {
    this.renderer?.destroy();
    this.li.parentElement?.removeChild(this.li);
  }
}
