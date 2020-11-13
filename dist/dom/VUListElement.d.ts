import { VanillaContext } from '../Container';
import { VLIElement } from './VLIElement';
import { MouseLocation } from '../core/MouseLocation';
import { ContextNode } from '../core/ContextNode';
import { VElement, VElementParams } from '../core/VElement';
export interface VUListElementParams extends VElementParams {
    context: VanillaContext;
    e: Event;
    parent?: VLIElement;
    nodes: ContextNode[];
}
/**
 * Virtual UList Element
 */
export declare class VUListElement implements VElement {
    ul: HTMLUListElement;
    children: VLIElement[];
    params: VUListElementParams;
    constructor(params: VUListElementParams);
    onAttached(): void;
    getElement(): HTMLElement;
    setChildren(): void;
    show(): void;
    hide(): void;
    select(vLi: VLIElement): void;
    setLocation(location: MouseLocation): void;
    onDestroy(): void;
    private parseGroupClass;
}
