import { ContextNode } from '../core/ContextNode';
import { VEventContainer } from '../core/VEvent';
import { VUListElement } from './VUListElement';
import {
  RendererInterface,
  isClassRenderer,
  isFunctionRenderer,
  isStringRenderer
} from '../core/Renderer';

export interface VLIElementParams {
  e: Event;
  parent: VUListElement;
  node: ContextNode;
}

export class VLIElement {
  public li: HTMLLIElement = document.createElement('li');
  public vEventContainer: VEventContainer = new VEventContainer({
    element: this.li
  });
  public params: VLIElementParams;
  public renderer: RendererInterface | undefined;
  public child: VUListElement | undefined;

  public constructor(params: VLIElementParams) {
    this.params = params;
    this.parseRenderer();
    this.setEvent();
    this.setChild();
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
  }

  public onClick(): void {
    this.params.node.onClick(this.params.e);
  }

  public setChild(): void {
    if (this.params.node.children) {
      this.child = new VUListElement({
        e: this.params.e,
        parent: this,
        nodes: this.params.node.children
      });
    }
  }

  public destroy(): void {
    if (this.renderer?.destroy) {
      this.renderer.destroy();
    }
  }
}
