/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
// type Position = {
// x: number;
// y: number;
// };

import './style.css';

interface LayoutLocation {
  x: number;
  y: number;
}

interface VanillaContextNode {
  renderer: () => string | HTMLElement;
  onClick?: (event: Event) => void;
  children?: VanillaContextNode[];
}

interface VanillaEventNode {
  element: HTMLElement;
  event: string;
  listener: (e: Event) => void;
}

class VanillaEventContainer {
  public nodes: VanillaEventNode[] = [];

  public add(node: VanillaEventNode) {
    this.nodes.push(node);
  }

  public remove(node: VanillaEventNode) {
    const idx = this.nodes.indexOf(node);
    if (idx >= 0) {
      this.invalidate(this.nodes[idx]);
      this.nodes.splice(idx, 1);
    } else {
      throw new Error('No matched event node');
    }
  }

  public destroy() {
    this.nodes.forEach(({ element, event, listener }) => {
      element.removeEventListener(event, listener);
    });
  }

  private invalidate(node: VanillaEventNode) {
    node.element.removeEventListener(node.event, node.listener);
  }
}

interface VanillaLayout {
  getLayout: () => HTMLElement;
  setRenderer: () => void;
}

class VanillaContextItem {
  public static ClassList = {
    default: 'vanilla-context-li',
    hover: 'vanilla-context-li-hover'
  };

  public group: VanillaContextGroup;
  public layout: HTMLLIElement = document.createElement('li');
  public listeners: VanillaEventNode[] = [];
  public child: VanillaContextGroup | undefined;

  constructor(group: VanillaContextGroup, node: VanillaContextNode) {
    this.group = group;
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
  }

  setChild(nodes: VanillaContextNode[] | undefined): void {
    if (nodes) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      this.child = new VanillaContextGroup(nodes);
      this.layout.appendChild(this.child.layout);
    }
  }

  setEventListener(): void {
    this.layout.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.layout.addEventListener('mouseout', this.onMouseOut.bind(this));
    this.layout.addEventListener('click', this.onClick.bind(this));
  }

  onMouseOver(e: HTMLElementEventMap['mouseover']): void {
    console.log('mouseover');
    this.layout.classList.add(VanillaContextItem.ClassList.hover);
    if (this.child) {
      this.child.show();
      this.child.setPosition(this.getChildLocation(e));
    }
    this.group.selectItem(this);
  }

  onMouseOut(e: HTMLElementEventMap['mouseout']): void {
    console.log('mouseout');
    this.layout.classList.remove(VanillaContextItem.ClassList.hover);
  }

  getChildLocation(e: HTMLElementEventMap['mouseover']): LayoutLocation {
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

  onClick(e: HTMLElementEventMap['click']): void {}

  destroy(): void {}
}

class VanillaContextGroup {
  public static ClassList = {
    default: 'vanilla-context-ul',
    active: 'vanilla-context-ul-active'
  };

  public layout: HTMLUListElement = document.createElement('ul');
  public listeners: VanillaEventNode[] = [];
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

  selectItem(item: VanillaContextItem): void {
    this.children.forEach(compare => {
      if (item !== compare) {
        compare.hide();
      }
    });
  }
}

class VanillaContext {
  public contextGroup: VanillaContextGroup;

  constructor(element: HTMLElement, nodes: VanillaContextNode[]) {
    this.contextGroup = new VanillaContextGroup(nodes);
    element.appendChild(this.contextGroup.layout);
    this.setListener(element);
  }

  setListener(element: HTMLElement): void {
    document.addEventListener('click', this.onWindowClick.bind(this));
    element.addEventListener('contextmenu', this.onContextRequest.bind(this));
  }

  onContextRequest(e: HTMLElementEventMap['contextmenu']): void {
    e.preventDefault();
    this.contextGroup.layout.style.top = this.getMousePosition(e).y + 'px';
    this.contextGroup.layout.style.left = this.getMousePosition(e).x + 'px';
    this.contextGroup.show();
  }

  onWindowClick(e: Event): void {
    if (e.target) {
      const isContain = this.contextGroup.layout.contains(e.target as Node);
      if (!isContain) {
        this.contextGroup.hide();
      }
    } else {
      this.contextGroup.hide();
    }
  }

  getMousePosition(e: HTMLElementEventMap['contextmenu']): LayoutLocation {
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

const data: VanillaContextNode[] = [
  {
    renderer: (): string => '안녕',
    onClick: (e: Event): void => {}
  },
  {
    renderer: (): string => '안녕',
    children: [
      {
        renderer: (): string => 'ㅋㅋ'
      },
      {
        renderer: (): string => 'ㅋㅋ'
      },
      {
        renderer: (): string => 'ㅋㅋ',
        children: [
          {
            renderer: (): string => 'ㅋㅋ'
          },
          {
            renderer: (): string => 'ㅋㅋ'
          },
          {
            renderer: (): string => 'ㅋㅋ',
            children: [
              {
                renderer: (): string => 'ㅋㅋ'
              },
              {
                renderer: (): string => 'ㅋㅋ'
              },
              {
                renderer: (): string => 'ㅋㅋ'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    renderer: (): string => '안녕',
    children: [
      {
        renderer: (): string => '<input type="button" value="버튼임">'
      },
      {
        renderer: (): string => 'ㅋㅋ'
      },
      {
        renderer: (): string => 'ㅋㅋ'
      }
    ]
  }
];

const context = new VanillaContext(document.body, data);
