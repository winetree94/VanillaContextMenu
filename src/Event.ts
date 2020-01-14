export interface VanillaEventNode {
  element: HTMLElement;
  event: string;
  listener: EventListenerOrEventListenerObject;
}

export class VanillaEventContainer {
  public nodes: VanillaEventNode[] = [];

  public add(...nodes: VanillaEventNode[]): void {
    nodes.forEach(({ element, event, listener }) => {
      element.addEventListener(event, listener);
    });
    this.nodes.push(...nodes);
  }

  public remove(node: VanillaEventNode): void {
    const idx = this.nodes.indexOf(node);
    if (idx >= 0) {
      VanillaEventContainer.invalidate(this.nodes[idx]);
      this.nodes.splice(idx, 1);
    } else {
      throw new Error('No matched event node');
    }
  }

  public destroy(): void {
    this.nodes.forEach(this.remove);
  }

  private static invalidate(node: VanillaEventNode): void {
    node.element.removeEventListener(node.event, node.listener);
  }
}
