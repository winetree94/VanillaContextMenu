export interface VElementParams {
  e: Event;
  parent?: VElement;
}

export interface VElement {
  getElement: () => HTMLElement;
  onDestroy: () => void;
  detach: () => void;
}
