import { LifeCycle } from './LifeCycle';

type EventListener<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
any;

interface VEvent {
  type: keyof HTMLElementEventMap;
  listener: EventListener<keyof HTMLElementEventMap>;
}

export interface VEventContainerInterface {
  element: HTMLElement;
}
export class VEventContainer {
  public params: VEventContainerInterface;
  public listeners: VEvent[] = [];

  public constructor(params: VEventContainerInterface) {
    this.params = params;
  }

  public addEventListener(
    type: keyof HTMLElementEventMap,
    listener: EventListener<keyof HTMLElementEventMap>,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.params.element.addEventListener(type, listener, options);
    this.listeners.push({ type, listener });
  }

  public clearEventListener(type: keyof HTMLElementEventMap): void {
    this.listeners.forEach(event => {
      if (event.type === type) {
        this.params.element.removeEventListener(event.type, event.listener);
      }
    });
  }

  public destroy(): void {
    this.listeners.forEach(({ type, listener }) => {
      this.params.element.removeEventListener(type, listener);
    });
  }
}
