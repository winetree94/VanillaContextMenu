import { ContextNode } from './core/ContextNode';
import { VEventContainer } from './core/VEvent';
import { VUListElement } from './dom/VUListElement';
export interface ContextNodeParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface ContextGroupClassParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface ContextItemClassParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface ContextItemStyleParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface ContextGroupStyleParams {
    api: VanillaContext;
    originEvent: Event;
}
export interface VanillaContextOptions {
    debug?: boolean;
    autoClose?: boolean;
    hideArrow?: boolean;
    customArrow?: string;
    groupStyle?: object | ((params: ContextGroupStyleParams) => object);
    itemStyle?: object | ((params: ContextItemStyleParams) => object);
    groupClasses?: string | ((params: ContextGroupClassParams) => string);
    itemClasses?: string | ((params: ContextItemClassParams) => string);
    nodes: ContextNode[] | ((params: ContextNodeParams) => ContextNode[]);
}
export declare const defaultContextOptions: VanillaContextOptions;
export declare class VanillaContext {
    static Holder: VanillaContext[];
    element: HTMLElement;
    events: VEventContainer;
    options: VanillaContextOptions;
    context: VUListElement | undefined;
    constructor(element: HTMLElement, options: VanillaContextOptions);
    setEvents(): void;
    /**
     * context click action
     * this will invalidate other contexts and
     * display new context to the dom
     * @param e {Event} - right mouse click event.
     */
    onContextRequested(e: Event): void;
    onWindowClicked(e: Event): void;
    close(): void;
    private static getMousePosition;
}
export default VanillaContext;
