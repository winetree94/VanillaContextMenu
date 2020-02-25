// import { Params } from './Params';
/* Renderer type definition */
import { VanillaContext } from '../Container';

export type FunctionRenderer = (params: RendererParams) => Node | string;
export type ClassRenderer = new () => RendererInterface;
export type StringRenderer = string;
export type Renderer = StringRenderer | ClassRenderer | FunctionRenderer;

/* Renderer Params */
export interface RendererParams {
  api: VanillaContext;
  originEvent: Event;
}

/* Class renderer interface */
export interface RendererInterface {
  init: (params: RendererParams) => void;
  getLayout: () => Node;
  destroy: () => void;
}

/* parser */
export function isFunctionRenderer(
  renderer: FunctionRenderer | ClassRenderer | StringRenderer
): renderer is FunctionRenderer {
  return typeof renderer === 'function' && !('init' in renderer);
}

export function isClassRenderer(
  renderer: FunctionRenderer | ClassRenderer | StringRenderer
): renderer is ClassRenderer {
  return typeof renderer === 'function' && 'init' in renderer;
}

export function isStringRenderer(
  renderer: FunctionRenderer | ClassRenderer | StringRenderer
): renderer is string {
  return typeof renderer === 'string';
}
