export interface VElementParams {
    e: Event;
    parent?: VElement;
}
export interface VElement {
    getElement: () => HTMLElement;
    onAttached: () => void;
    onDestroy: () => void;
}
