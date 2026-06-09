"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.changePassword = changePassword;
exports.getUserInfo = getUserInfo;
const request_1 = require("./request");
function getProfile() {
    return (0, request_1.get)('/api/v1/user/profile');
}
function updateProfile(data) {
    return (0, request_1.put)('/api/v1/user/profile', data);
}
function changePassword(oldPassword, newPassword) {
    return (0, request_1.put)('/api/v1/user/password', { oldPassword, newPassword });
}
function getUserInfo(userId) {
    return (0, request_1.get)(`/api/v1/user/info/${userId}`);
}
