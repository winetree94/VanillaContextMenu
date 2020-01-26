import { Renderer } from './Renderer';

export interface ContextNode {
  renderer: Renderer;
  onClick: (e: Event) => void;
  children?: ContextNode[];
}
