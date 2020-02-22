import { LifeCycle } from './LifeCycle';

type EventListener<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
any;

interface VEvent {
  element: Node;
  type: keyof HTMLElementEventMap;
  listener: EventListener<keyof HTMLElementEventMap>;
}

export class VEventContainer {
  public listeners: VEvent[] = [];

  public addEventListener(
    element: Node,
    type: keyof HTMLElementEventMap,
    listener: EventListener<keyof HTMLElementEventMap>,
    options?: boolean | AddEventListenerOptions
  ): void {
    element.addEventListener(type, listener, options);
    this.listeners.push({ element, type, listener });
  }

  public destroy(): void {
    this.listeners.forEach(({ element, type, listener }) => {
      element.removeEventListener(type, listener);
    });
  }
}
