"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryTree = getCategoryTree;
exports.getCategoryChildren = getCategoryChildren;
const request_1 = require("./request");
function getCategoryTree() {
    return (0, request_1.get)('/api/v1/categories');
}
function getCategoryChildren(parentId) {
    return (0, request_1.get)(`/api/v1/categories/${parentId}/children`);
}
