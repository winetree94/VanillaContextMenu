import { LifeCycle } from './LifeCycle';

type EventListener<K extends keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
any;

interface Event {
  type: keyof HTMLElementEventMap;
  listener: EventListener<keyof HTMLElementEventMap>;
}

export abstract class EventContainer implements LifeCycle {
  public abstract element: HTMLElement;
  public listeners: Event[] = [];

  public addEventListener(
    type: keyof HTMLElementEventMap,
    listener: EventListener<keyof HTMLElementEventMap>,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.element.addEventListener(type, listener, options);
    this.listeners.push({ type, listener });
  }

  public clearEventListener(type: keyof HTMLElementEventMap): void {
    this.listeners.forEach(event => {
      if (event.type === type) {
        this.element.removeEventListener(event.type, event.listener);
      }
    });
  }

  destroy(): void {
    this.listeners.forEach(({ type, listener }) => {
      this.element.removeEventListener(type, listener);
    });
  }
}
