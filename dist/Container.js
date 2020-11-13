"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VEvent_1 = require("./core/VEvent");
var VUListElement_1 = require("./dom/VUListElement");
exports.defaultContextOptions = {
    autoClose: true,
    debug: true,
    nodes: []
};
var VanillaContext = /** @class */ (function () {
    function VanillaContext(element, options) {
        if (!element) {
            throw new Error('element is requirement parameter');
        }
        this.element = element;
        this.options = Object.assign(exports.defaultContextOptions, options);
        this.events = new VEvent_1.VEventContainer();
        this.setEvents();
    }
    VanillaContext.prototype.setEvents = function () {
        this.events.addEventListener(this.element, 'contextmenu', this.onContextRequested.bind(this));
        this.events.addEventListener(document, 'click', this.onWindowClicked.bind(this));
    };
    /**
     * context click action
     * this will invalidate other contexts and
     * display new context to the dom
     * @param e {Event} - right mouse click event.
     */
    VanillaContext.prototype.onContextRequested = function (e) {
        var _this = this;
        /* prevent showing default context menu */
        e.preventDefault();
        /* if user request context inside opened context, will stop */
        if (this.context && this.context.ul.contains(e.target)) {
            return;
        }
        /* if user clicked opened context location, will restart context */
        if (this.context) {
            this.context.onDestroy();
        }
        /* create context root */
        this.context = new VUListElement_1.VUListElement({
            context: this,
            e: e,
            nodes: (function () {
                if (typeof _this.options.nodes === 'function') {
                    return _this.options.nodes({
                        api: _this,
                        originEvent: e
                    });
                }
                else {
                    return _this.options.nodes;
                }
            })()
        });
        /* attach context root to element and reflect mouse location on the ul element */
        this.element.appendChild(this.context.getElement());
        /* get Mouse position */
        var _a = VanillaContext.getMousePosition(e), x = _a.x, y = _a.y;
        /* this will showing context and locate correct position */
        this.context.show();
        this.context.setLocation({ x: x, y: y });
    };
    VanillaContext.prototype.onWindowClicked = function (e) {
        if (this.context && !this.context.ul.contains(e.target)) {
            this.context.onDestroy();
        }
    };
    VanillaContext.prototype.close = function () {
        if (this.context) {
            this.context.onDestroy();
        }
    };
    VanillaContext.getMousePosition = function (event) {
        var e = event;
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx =
                e.clientX +
                    document.body.scrollLeft +
                    document.documentElement.scrollLeft;
            posy =
                e.clientY +
                    document.body.scrollTop +
                    document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        };
    };
    return VanillaContext;
}());
exports.VanillaContext = VanillaContext;
exports.default = VanillaContext;
//# sourceMappingURL=Container.js.map