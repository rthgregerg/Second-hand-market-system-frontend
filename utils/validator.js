"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPhone = isValidPhone;
exports.isValidPassword = isValidPassword;
exports.isValidPrice = isValidPrice;
exports.showToast = showToast;
function isValidPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}
function isValidPassword(pwd) {
    return pwd.length >= 6 && pwd.length <= 32;
}
function isValidPrice(val) {
    const n = Number(val);
    return !isNaN(n) && n > 0 && n < 100000000;
}
function showToast(title, icon = 'none') {
    wx.showToast({ title, icon, duration: 2000 });
}
