"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VLIElement_1 = require("./VLIElement");
/**
 * Virtual UList Element
 */
var VUListElement = /** @class */ (function () {
    function VUListElement(params) {
        this.ul = document.createElement('ul');
        this.children = [];
        this.params = params;
        this.setChildren();
        this.ul.className = 'vanilla-context-ul';
        this.parseGroupClass();
    }
    VUListElement.prototype.onAttached = function () {
        return;
    };
    VUListElement.prototype.getElement = function () {
        return this.ul;
    };
    VUListElement.prototype.setChildren = function () {
        var _this = this;
        this.params.nodes.forEach(function (node, index) {
            var params = {
                context: _this.params.context,
                e: _this.params.e,
                index: index,
                parent: _this,
                node: node
            };
            var vLi = new VLIElement_1.VLIElement(params);
            _this.getElement().appendChild(vLi.getElement());
            setTimeout(vLi.onAttached.bind(vLi), 0);
            _this.children.push(vLi);
        });
    };
    VUListElement.prototype.show = function () {
        this.ul.classList.add('active');
    };
    VUListElement.prototype.hide = function () {
        this.ul.classList.remove('active');
    };
    VUListElement.prototype.select = function (vLi) {
        this.children.forEach(function (compare) {
            return vLi === compare ? vLi.openChild() : compare.closeChild();
        });
    };
    VUListElement.prototype.setLocation = function (location) {
        this.ul.style.top = location.y + 'px';
        this.ul.style.left = location.x + 'px';
    };
    VUListElement.prototype.onDestroy = function () {
        var _a;
        (_a = this.ul.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.ul);
        this.children.forEach(function (child) {
            child.onDestroy();
        });
    };
    VUListElement.prototype.parseGroupClass = function () {
        var groupClasses = this.params.context.options.groupClasses;
        if (!groupClasses) {
            return;
        }
        if (typeof groupClasses === 'function') {
            var classes = groupClasses({
                api: this.params.context,
                originEvent: this.params.e
            });
            this.ul.className = this.ul.className + " " + classes;
        }
        else {
            this.ul.className = this.ul.className + " " + groupClasses;
        }
    };
    return VUListElement;
}());
exports.VUListElement = VUListElement;
//# sourceMappingURL=VUListElement.js.map