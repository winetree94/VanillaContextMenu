import { Renderer } from './Renderer';
import { VanillaContext } from '../Container';
export interface ContextNodeEventParams {
    api: VanillaContext;
    event: Event;
    originEvent: Event;
}
export interface ContextDisabledParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface ContextStyleParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface ContextClassParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface ContextNode {
    renderer: Renderer;
    onClick?: (params: ContextNodeEventParams) => void;
    children?: ContextNode[];
    disabled?: boolean | ((params: ContextDisabledParams) => boolean);
    style?: object | ((params: ContextStyleParams) => object);
    classes?: string | ((params: ContextClassParams) => string);
}
