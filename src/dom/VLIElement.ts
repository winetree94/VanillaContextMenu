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

export interface VLIElementParams extends VElementParams {
  e: Event;
  parent: VUListElement;
  node: ContextNode;
}

export class VLIElement implements VElement {
  public li: HTMLLIElement = document.createElement('li');
  public vEventContainer: VEventContainer = new VEventContainer({
    element: this.li
  });
  public params: VLIElementParams;
  public renderer: RendererInterface | undefined;
  public child: VUListElement | undefined;

  public constructor(params: VLIElementParams) {
    this.li.className = 'vanilla-context-li';
    this.params = params;
    this.parseRenderer();
    this.params.parent.ul.appendChild(this.li);
    this.setEvent();
    this.setChild();
  }

  public onCreate(params: VElementParams) {
  }

  public getElement() {
    return this.li;
  }

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
          'Not supported renderer type, you have to return Node or String'
        );
      }
    } else if (isStringRenderer(renderer)) {
      this.li.innerHTML = renderer;
    }
  }

  public setEvent(): void {
    this.vEventContainer.addEventListener('click', this.onClick.bind(this));
    this.vEventContainer.addEventListener(
      'mouseover',
      this.onMouseOver.bind(this)
    );
    this.vEventContainer.addEventListener(
      'mouseout',
      this.onMouseOut.bind(this)
    );
  }

  public onClick(): void {
    if (this.params.node.onClick) {
      this.params.node.onClick(this.params.e);
    }
  }

  public onMouseOver(): void {
    this.li.classList.add('vanilla-context-li-hover');
    if (this.child) {
      this.child.show();
      const { top, left, width } = this.li.getBoundingClientRect();
      this.child.setLocation({
        x: left + width,
        y: top
      });
      this.params.parent.select(this);
    }
  }

  public onMouseOut(): void {
    this.li.classList.remove('vanilla-context-li-hover');
    if (this.child) {
      this.child.hide();
    }
  }

  public setChild(): void {
    if (this.params.node.children) {
      this.child = new VUListElement({
        e: this.params.e,
        parent: this,
        nodes: this.params.node.children
      });
      this.li.appendChild(this.child.ul);
    }
  }

  public showChild(): void {
    if (this.child) {
      this.child.show();
    }
  }

  public hideChild(): void {
    if (this.child) {
      this.child.hide();
    }
  }

  public onDestroy(): void {
    if (this.renderer?.destroy) {
      this.renderer.destroy();
    }
  }
}
