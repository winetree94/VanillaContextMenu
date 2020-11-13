"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VEvent_1 = require("../core/VEvent");
var VUListElement_1 = require("./VUListElement");
var Renderer_1 = require("../core/Renderer");
var VLIElement = /** @class */ (function () {
    function VLIElement(params) {
        this.li = document.createElement('li');
        this.events = new VEvent_1.VEventContainer();
        this.li.className = 'vanilla-context-li';
        this.params = params;
        this.parseRenderer();
    }
    VLIElement.prototype.onAttached = function () {
        this.parseItemClass();
        this.parseItemStyle();
        this.parseNodeClass();
        this.parseNodeStyle();
        this.parseNodeDisabled();
        this.setChild();
        this.setEvent();
    };
    VLIElement.prototype.setChild = function () {
        if (this.params.node.children) {
            this.child = new VUListElement_1.VUListElement({
                context: this.params.context,
                e: this.params.e,
                parent: this,
                nodes: this.params.node.children
            });
            this.li.appendChild(this.child.getElement());
        }
    };
    VLIElement.prototype.getElement = function () {
        return this.li;
    };
    /**
     * Parse custom renderer user provided
     */
    VLIElement.prototype.parseRenderer = function () {
        var renderer = this.params.node.renderer;
        if (Renderer_1.isClassRenderer(renderer)) {
            this.renderer = new renderer();
            this.renderer.init({
                api: this.params.context,
                originEvent: this.params.e
            });
        }
        else if (Renderer_1.isFunctionRenderer(renderer)) {
            var elementOrString = renderer({
                api: this.params.context,
                originEvent: this.params.e
            });
            if (elementOrString instanceof Node) {
                this.li.appendChild(elementOrString);
            }
            else if (typeof elementOrString === 'string') {
                this.li.innerHTML = elementOrString;
            }
            else {
                throw new Error('Unsupported renderer type, you have to return Node or String');
            }
        }
        else if (Renderer_1.isStringRenderer(renderer)) {
            this.li.innerHTML = renderer;
        }
        else {
            throw new Error('Unsupported renderer type');
        }
        var children = this.params.node.children;
        /* If node has child nodes, create arrow icon */
        if (children) {
            var icon = document.createElement('div');
            icon.classList.add('vanilla-context-icon');
            this.li.appendChild(icon);
        }
    };
    VLIElement.prototype.setEvent = function () {
        this.events.addEventListener(this.li, 'click', this.onClick.bind(this));
        this.events.addEventListener(this.li, 'mouseover', this.onMouseOver.bind(this));
        this.events.addEventListener(this.li, 'mouseout', this.onMouseOut.bind(this));
    };
    VLIElement.prototype.onClick = function (e) {
        if (e.target === this.li && this.params.node.onClick) {
            this.params.node.onClick({
                api: this.params.context,
                event: e,
                originEvent: this.params.e
            });
            if (this.params.context.options.autoClose) {
                this.params.context.close();
            }
        }
    };
    /**
     * mouse over event of li.
     * if children exist, this will create a child ul element
     */
    VLIElement.prototype.onMouseOver = function (e) {
        this.li.classList.add('hover');
        this.params.parent.select(this);
    };
    /**
     * mouse out event of li
     */
    VLIElement.prototype.onMouseOut = function (e) {
        this.li.classList.remove('hover');
    };
    /**
     * open context children
     */
    VLIElement.prototype.openChild = function () {
        var _a, _b;
        var _c = this.params.parent.ul.getBoundingClientRect(), left = _c.left, width = _c.width;
        var top = this.li.getBoundingClientRect().top;
        (_a = this.child) === null || _a === void 0 ? void 0 : _a.show();
        (_b = this.child) === null || _b === void 0 ? void 0 : _b.setLocation({ x: left + width - 1, y: top - 1 });
    };
    /**
     * hide context children
     */
    VLIElement.prototype.closeChild = function () {
        var _a;
        (_a = this.child) === null || _a === void 0 ? void 0 : _a.hide();
    };
    VLIElement.prototype.onDestroy = function () {
        var _a, _b;
        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.li.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(this.li);
    };
    VLIElement.prototype.parseItemClass = function () {
        var itemClasses = this.params.context.options.itemClasses;
        if (!itemClasses) {
            return;
        }
        if (typeof itemClasses === 'function') {
            var classList = itemClasses({
                api: this.params.context,
                originEvent: this.params.e
            });
            this.li.className = this.li.className + " " + classList;
        }
        else {
            this.li.className = this.li.className + " " + itemClasses;
        }
    };
    VLIElement.prototype.parseItemStyle = function () {
        var itemStyle = this.params.context.options.itemStyle;
        if (!itemStyle) {
            return;
        }
        var style = typeof itemStyle === 'function'
            ? itemStyle({
                api: this.params.context,
                originEvent: this.params.e
            })
            : itemStyle;
        Object.assign(this.li.style, style);
    };
    /**
     * parse disabled property
     */
    VLIElement.prototype.parseNodeDisabled = function () {
        var disabled = this.params.node.disabled;
        /* if user not provide disabled property, will stop */
        if (!disabled) {
            return;
        }
        /* if property type is boolean */
        if (disabled === true) {
            this.li.classList.add('disabled');
            /* if property type is function */
        }
        else if (typeof disabled === 'function' &&
            disabled({
                api: this.params.context,
                originEvent: this.params.e
            })) {
            this.li.classList.add('disabled');
        }
    };
    /**
     * parse height property
     */
    VLIElement.prototype.parseNodeStyle = function () {
        var style = this.params.node.style;
        if (!style) {
            return;
        }
        /* If user provided custom height */
        if (typeof style === 'function') {
            Object.assign(this.li.style, style({
                api: this.params.context,
                originEvent: this.params.e
            }));
        }
        else {
            Object.assign(this.li.style, style);
        }
    };
    VLIElement.prototype.parseNodeClass = function () {
        var classes = this.params.node.classes;
        if (!classes) {
            return;
        }
        if (typeof classes === 'function') {
            var classList = classes({
                api: this.params.context,
                originEvent: this.params.e
            });
            this.li.className = this.li.className + " " + classList;
        }
        else {
            this.li.className = this.li.className + " " + classes;
        }
    };
    return VLIElement;
}());
exports.VLIElement = VLIElement;
//# sourceMappingURL=VLIElement.js.map