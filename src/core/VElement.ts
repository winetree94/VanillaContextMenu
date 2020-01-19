import { EventContainer } from './EventContainer';
import { LifeCycle } from './LifeCycle';
import { Params } from './Params';

export abstract class VElement extends EventContainer implements LifeCycle {
  public abstract element: HTMLElement;
  public abstract init: (params: Params) => void;
  public destroy(): void {
    super.destroy();
  }
}
