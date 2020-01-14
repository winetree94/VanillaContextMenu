import { VanillaContextNode } from './Node';
import { VanillaContextGroup } from './Group';
import { VanillaEventContainer } from './Event';
import { LayoutLocation } from './Layout';

export class VanillaContextItem {
  public static ClassList = {
    default: 'vanilla-context-li',
    hover: 'vanilla-context-li-hover'
  };

  public group: VanillaContextGroup;
  public node: VanillaContextNode;
  public layout: HTMLLIElement = document.createElement('li');
  public eventContainer: VanillaEventContainer = new VanillaEventContainer();
  public child: VanillaContextGroup | undefined;

  constructor(group: VanillaContextGroup, node: VanillaContextNode) {
    this.group = group;
    this.node = node;
    this.layout.classList.add(VanillaContextItem.ClassList.default);
    this.setRenderer(node.renderer);
    this.setChild(node.children);
    this.setEventListener();
  }

  setRenderer(renderer: () => string | HTMLElement): void {
    const rendered = renderer();
    if (rendered instanceof HTMLElement) {
      this.layout.appendChild(rendered);
    } else {
      this.layout.innerHTML = rendered;
    }
    const inputs = this.layout.querySelectorAll('input, button, i');
    inputs.forEach(input => {
      this.eventContainer.add({
        element: input as HTMLElement,
        event: 'click',
        listener: this.setPreventClick.bind(this)
      });
    });
  }

  setPreventClick(e: Event): void {
    e.preventDefault();
  }

  setChild(nodes: VanillaContextNode[] | undefined): void {
    if (nodes) {
      this.child = new VanillaContextGroup(nodes);
      this.layout.appendChild(this.child.layout);
    }
  }

  setEventListener(): void {
    this.eventContainer.add(
      {
        element: this.layout,
        event: 'mouseover',
        listener: this.onMouseOver.bind(this)
      },
      {
        element: this.layout,
        event: 'mouseout',
        listener: this.onMouseOut.bind(this)
      },
      {
        element: this.layout,
        event: 'click',
        listener: this.onClick.bind(this)
      }
    );
  }

  onMouseOver(e: Event): void {
    this.layout.classList.add(VanillaContextItem.ClassList.hover);
    if (this.child) {
      this.child.show();
      this.child.setPosition(this.getChildLocation(e));
    }
    this.group.selectItem(this);
  }

  onMouseOut(e: Event): void {
    this.layout.classList.remove(VanillaContextItem.ClassList.hover);
  }

  getChildLocation(e: Event): LayoutLocation {
    const ul = this.group.layout;
    const rect: DOMRect = ul.getBoundingClientRect();
    const axis = {
      x: rect.x + rect.width - 1,
      y: this.layout.getBoundingClientRect().top
    };
    return axis;
  }

  show(): void {
    this.child?.show();
  }

  hide(): void {
    this.child?.hide();
  }

  onClick(e: Event): void {
    if (this.node.onClick) {
      this.node.onClick(e);
    }
  }

  destroy(): void {
    if (this.child) {
      this.child.destroy();
    }
  }
}
