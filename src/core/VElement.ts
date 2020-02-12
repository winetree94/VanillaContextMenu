export interface VElementParams {
  parent?: VElement;
}

export interface VElement {
  getLayout: () => HTMLElement;
  onCreate: (params: VElementParams) => void;
  onDestroy: () => void;
}
