"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PRODUCT_IMG = exports.DEFAULT_AVATAR = exports.fullUrl = void 0;
const BASE_URL = 'http://localhost:8080';
function fullUrl(path) {
    if (!path)
        return '';
    if (path.startsWith('http'))
        return path;
    return BASE_URL + (path.startsWith('/') ? '' : '/') + path;
}
exports.fullUrl = fullUrl;
exports.DEFAULT_AVATAR = '/images/default-avatar.png';
exports.DEFAULT_PRODUCT_IMG = '/images/default-product.png';
