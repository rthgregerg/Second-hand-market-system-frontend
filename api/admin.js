"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.toggleUserStatus = toggleUserStatus;
exports.forceOffShelf = forceOffShelf;
exports.getAllProducts = getAllProducts;
exports.getStatistics = getStatistics;
const request_1 = require("./request");
function getUsers(page = 1, size = 20, keyword) {
    return (0, request_1.get)('/api/v1/admin/users', { page, size, keyword });
}
function toggleUserStatus(id, status) {
    return (0, request_1.put)(`/api/v1/admin/users/${id}/status?status=${status}`);
}
function forceOffShelf(id) {
    return (0, request_1.put)(`/api/v1/admin/products/${id}/off-shelf`);
}
function getAllProducts(params) {
    return (0, request_1.get)('/api/v1/admin/products', params);
}
function getStatistics() {
    return (0, request_1.get)('/api/v1/admin/statistics');
}
