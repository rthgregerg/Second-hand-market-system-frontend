"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = exports.getAllProducts = exports.forceOffShelf = exports.toggleUserStatus = exports.getUsers = void 0;
const request_1 = require("./request");
function getUsers(page = 1, size = 20, keyword) {
    return (0, request_1.get)('/api/v1/admin/users', { page, size, keyword });
}
exports.getUsers = getUsers;
function toggleUserStatus(id, status) {
    return (0, request_1.put)(`/api/v1/admin/users/${id}/status?status=${status}`);
}
exports.toggleUserStatus = toggleUserStatus;
function forceOffShelf(id) {
    return (0, request_1.put)(`/api/v1/admin/products/${id}/off-shelf`);
}
exports.forceOffShelf = forceOffShelf;
function getAllProducts(params) {
    return (0, request_1.get)('/api/v1/admin/products', params);
}
exports.getAllProducts = getAllProducts;
function getStatistics() {
    return (0, request_1.get)('/api/v1/admin/statistics');
}
exports.getStatistics = getStatistics;
