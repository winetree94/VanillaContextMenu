import { VanillaEventContainer } from './Event';
import { VanillaContextItem } from './Item';
import { VanillaContextNode } from './Node';
import { LayoutLocation } from './Layout';

export class VanillaContextGroup {
  public static ClassList = {
    default: 'vanilla-context-ul',
    active: 'vanilla-context-ul-active'
  };

  public layout: HTMLUListElement = document.createElement('ul');
  public eventContainer: VanillaEventContainer = new VanillaEventContainer();
  public children: VanillaContextItem[] = [];

  constructor(nodes: VanillaContextNode[]) {
    this.layout.classList.add(VanillaContextGroup.ClassList.default);
    this.setChildren(nodes);
  }

  setChildren(nodes: VanillaContextNode[]): void {
    nodes.forEach(node => {
      const item = new VanillaContextItem(this, node);
      this.layout.appendChild(item.layout);
      this.children.push(item);
    });
  }

  setPosition(position: LayoutLocation): void {
    this.layout.style.top = position.y + 'px';
    this.layout.style.left = position.x + 'px';
  }

  show(): void {
    this.layout.classList.add(VanillaContextGroup.ClassList.active);
  }

  hide(): void {
    this.layout.classList.remove(VanillaContextGroup.ClassList.active);
    this.children.forEach(child => child.hide());
  }

  destroy(): void {
    this.eventContainer.destroy();
    this.children.forEach(child => child.destroy());
  }

  selectItem(item: VanillaContextItem): void {
    this.children.forEach(compare => {
      if (item !== compare) {
        compare.hide();
      }
    });
  }
}
