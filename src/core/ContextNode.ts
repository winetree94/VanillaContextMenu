import { Renderer } from './Renderer';
import { VanillaContext } from '../Container';

export interface ContextNodeEventParams {
  api: VanillaContext;
  event: Event;
  originEvent: Event;
}

export interface ContextNode {
  renderer: Renderer;
  onClick: (params: ContextNodeEventParams) => void;
  children?: ContextNode[];
}
