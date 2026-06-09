"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.changePassword = exports.updateProfile = exports.getProfile = void 0;
const request_1 = require("./request");
function getProfile() {
    return (0, request_1.get)('/api/v1/user/profile');
}
exports.getProfile = getProfile;
function updateProfile(data) {
    return (0, request_1.put)('/api/v1/user/profile', data);
}
exports.updateProfile = updateProfile;
function changePassword(oldPassword, newPassword) {
    return (0, request_1.put)('/api/v1/user/password', { oldPassword, newPassword });
}
exports.changePassword = changePassword;
function getUserInfo(userId) {
    return (0, request_1.get)(`/api/v1/user/info/${userId}`);
}
exports.getUserInfo = getUserInfo;
