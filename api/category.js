"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryChildren = exports.getCategoryTree = void 0;
const request_1 = require("./request");
function getCategoryTree() {
    return (0, request_1.get)('/api/v1/categories');
}
exports.getCategoryTree = getCategoryTree;
function getCategoryChildren(parentId) {
    return (0, request_1.get)(`/api/v1/categories/${parentId}/children`);
}
exports.getCategoryChildren = getCategoryChildren;
