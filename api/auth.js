"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const request_1 = require("./request");
function login(account, password) {
    return (0, request_1.post)('/api/v1/auth/login', { account, password });
}
function register(username, password, phone, email) {
    return (0, request_1.post)('/api/v1/auth/register', { username, password, phone, email });
}
