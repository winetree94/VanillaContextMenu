import { VanillaContext } from '../Container';
export declare type FunctionRenderer = (params: RendererParams) => Node | string;
export declare type ClassRenderer = new () => RendererInterface;
export declare type StringRenderer = string;
export declare type Renderer = StringRenderer | ClassRenderer | FunctionRenderer;
export interface RendererParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface RendererInterface {
    init: (params: RendererParams) => void;
    getLayout: () => Node;
    destroy: () => void;
}
export declare function isFunctionRenderer(renderer: FunctionRenderer | ClassRenderer | StringRenderer): renderer is FunctionRenderer;
export declare function isClassRenderer(renderer: FunctionRenderer | ClassRenderer | StringRenderer): renderer is ClassRenderer;
export declare function isStringRenderer(renderer: FunctionRenderer | ClassRenderer | StringRenderer): renderer is string;
