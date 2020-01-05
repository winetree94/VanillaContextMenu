export interface VirtualElementOptions {
  id?: string;
  classList?: string[];
}

export interface VirtualElement extends VirtualElementOptions {
  tag: string;
  children: VirtualElement[];
}

export class VirtualElement implements VirtualElement {
  public children: VirtualElement[] = [];
}
