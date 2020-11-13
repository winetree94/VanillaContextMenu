import { ContextNode } from '../core/ContextNode';
import { VanillaContext } from '../Container';
import { VEventContainer } from '../core/VEvent';
import { VUListElement } from './VUListElement';
import { VElement, VElementParams } from '../core/VElement';
import { RendererInterface } from '../core/Renderer';
export interface VLIElementParams extends VElementParams {
    context: VanillaContext;
    e: Event;
    index: number;
    parent: VUListElement;
    node: ContextNode;
}
export declare class VLIElement implements VElement {
    li: HTMLLIElement;
    events: VEventContainer;
    params: VLIElementParams;
    renderer: RendererInterface | undefined;
    child: VUListElement | undefined;
    constructor(params: VLIElementParams);
    onAttached(): void;
    setChild(): void;
    getElement(): HTMLElement;
    /**
     * Parse custom renderer user provided
     */
    parseRenderer(): void;
    setEvent(): void;
    onClick(e: Event): void;
    /**
     * mouse over event of li.
     * if children exist, this will create a child ul element
     */
    onMouseOver(e: Event): void;
    /**
     * mouse out event of li
     */
    onMouseOut(e: Event): void;
    /**
     * open context children
     */
    openChild(): void;
    /**
     * hide context children
     */
    closeChild(): void;
    onDestroy(): void;
    private parseItemClass;
    private parseItemStyle;
    /**
     * parse disabled property
     */
    private parseNodeDisabled;
    /**
     * parse height property
     */
    private parseNodeStyle;
    private parseNodeClass;
}
