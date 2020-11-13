declare type EventListener<K extends keyof HTMLElementEventMap> = (this: HTMLElement, ev: HTMLElementEventMap[K]) => any;
interface VEvent {
    element: Node;
    type: keyof HTMLElementEventMap;
    listener: EventListener<keyof HTMLElementEventMap>;
}
export declare class VEventContainer {
    listeners: VEvent[];
    addEventListener(element: Node, type: keyof HTMLElementEventMap, listener: EventListener<keyof HTMLElementEventMap>, options?: boolean | AddEventListenerOptions): void;
    destroy(): void;
}
export {};
