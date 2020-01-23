import { EventContainer } from './EventContainer';
import { LifeCycle } from './LifeCycle';
import { Params } from './Params';

export abstract class VElement extends EventContainer implements LifeCycle {
  public abstract element: HTMLElement;
  public abstract init: (params: Params) => void;
  public abstract getElement: () => Node;
  public render(): Node {
    return document.createElement('div');
  }
  public destroy(): void {
    super.destroy();
  }
}
