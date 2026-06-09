"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = exports.getMyProducts = exports.offShelf = exports.onShelf = exports.unfavoriteProduct = exports.favoriteProduct = exports.updateProduct = exports.publishProduct = exports.getProductDetail = exports.searchProducts = void 0;
const request_1 = require("./request");
function searchProducts(params) {
    return (0, request_1.get)('/api/v1/products', params);
}
exports.searchProducts = searchProducts;
function getProductDetail(id) {
    return (0, request_1.get)(`/api/v1/products/${id}`);
}
exports.getProductDetail = getProductDetail;
function publishProduct(data) {
    return (0, request_1.post)('/api/v1/products', data);
}
exports.publishProduct = publishProduct;
function updateProduct(id, data) {
    return (0, request_1.put)(`/api/v1/products/${id}`, data);
}
exports.updateProduct = updateProduct;
function favoriteProduct(id) {
    return (0, request_1.post)(`/api/v1/products/${id}/favorite`);
}
exports.favoriteProduct = favoriteProduct;
function unfavoriteProduct(id) {
    return (0, request_1.del)(`/api/v1/products/${id}/favorite`);
}
exports.unfavoriteProduct = unfavoriteProduct;
function onShelf(id) {
    return (0, request_1.put)(`/api/v1/products/${id}/on-shelf`);
}
exports.onShelf = onShelf;
function offShelf(id) {
    return (0, request_1.put)(`/api/v1/products/${id}/off-shelf`);
}
exports.offShelf = offShelf;
function getMyProducts(page = 1, size = 10, status) {
    return (0, request_1.get)('/api/v1/products/my', { page, size, status });
}
exports.getMyProducts = getMyProducts;
function getFavorites(page = 1, size = 10) {
    return (0, request_1.get)('/api/v1/products/favorites', { page, size });
}
exports.getFavorites = getFavorites;
