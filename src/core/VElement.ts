export interface VElementParams {
  parent?: VElement;
}

export interface VElement {
  getElement: () => HTMLElement;
  onCreate: (params: VElementParams) => void;
  onDestroy: () => void;
}

