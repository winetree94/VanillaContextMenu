"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VEventContainer = /** @class */ (function () {
    function VEventContainer() {
        this.listeners = [];
    }
    VEventContainer.prototype.addEventListener = function (element, type, listener, options) {
        element.addEventListener(type, listener, options);
        this.listeners.push({ element: element, type: type, listener: listener });
    };
    VEventContainer.prototype.destroy = function () {
        this.listeners.forEach(function (_a) {
            var element = _a.element, type = _a.type, listener = _a.listener;
            element.removeEventListener(type, listener);
        });
    };
    return VEventContainer;
}());
exports.VEventContainer = VEventContainer;
//# sourceMappingURL=VEvent.js.map