"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* parser */
function isFunctionRenderer(renderer) {
    return typeof renderer === 'function' && !('init' in renderer);
}
exports.isFunctionRenderer = isFunctionRenderer;
function isClassRenderer(renderer) {
    return typeof renderer === 'function' && 'init' in renderer;
}
exports.isClassRenderer = isClassRenderer;
function isStringRenderer(renderer) {
    return typeof renderer === 'string';
}
exports.isStringRenderer = isStringRenderer;
//# sourceMappingURL=Renderer.js.map