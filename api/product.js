"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = searchProducts;
exports.getProductDetail = getProductDetail;
exports.publishProduct = publishProduct;
exports.updateProduct = updateProduct;
exports.favoriteProduct = favoriteProduct;
exports.unfavoriteProduct = unfavoriteProduct;
exports.onShelf = onShelf;
exports.offShelf = offShelf;
exports.getMyProducts = getMyProducts;
exports.getFavorites = getFavorites;
const request_1 = require("./request");
function searchProducts(params) {
    return (0, request_1.get)('/api/v1/products', params);
}
function getProductDetail(id) {
    return (0, request_1.get)(`/api/v1/products/${id}`);
}
function publishProduct(data) {
    return (0, request_1.post)('/api/v1/products', data);
}
function updateProduct(id, data) {
    return (0, request_1.put)(`/api/v1/products/${id}`, data);
}
function favoriteProduct(id) {
    return (0, request_1.post)(`/api/v1/products/${id}/favorite`);
}
function unfavoriteProduct(id) {
    return (0, request_1.del)(`/api/v1/products/${id}/favorite`);
}
function onShelf(id) {
    return (0, request_1.put)(`/api/v1/products/${id}/on-shelf`);
}
function offShelf(id) {
    return (0, request_1.put)(`/api/v1/products/${id}/off-shelf`);
}
function getMyProducts(page = 1, size = 10, status) {
    return (0, request_1.get)('/api/v1/products/my', { page, size, status });
}
function getFavorites(page = 1, size = 10) {
    return (0, request_1.get)('/api/v1/products/favorites', { page, size });
}
