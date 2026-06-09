"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showToast = exports.isValidPrice = exports.isValidPassword = exports.isValidPhone = void 0;
function isValidPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}
exports.isValidPhone = isValidPhone;
function isValidPassword(pwd) {
    return pwd.length >= 6 && pwd.length <= 32;
}
exports.isValidPassword = isValidPassword;
function isValidPrice(val) {
    const n = Number(val);
    return !isNaN(n) && n > 0 && n < 100000000;
}
exports.isValidPrice = isValidPrice;
function showToast(title, icon = 'none') {
    wx.showToast({ title, icon, duration: 2000 });
}
exports.showToast = showToast;
