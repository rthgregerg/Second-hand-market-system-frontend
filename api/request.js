"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = request;
exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;
const BASE_URL = 'http://localhost:8080';
function request(method, url, data, options = {}) {
    const app = getApp();
    const token = app.globalData.token;
    if (options.showLoading) {
        wx.showLoading({ title: '加载中...', mask: true });
    }
    const header = {};
    if (token) {
        header['Authorization'] = `Bearer ${token}`;
    }
    if (!options.isUpload) {
        header['content-type'] = 'application/json';
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: BASE_URL + url,
            method,
            data,
            header,
            success(res) {
                const result = res.data;
                if (result.code === 200) {
                    resolve(result);
                }
                else if (result.code === 401) {
                    app.globalData.token = null;
                    app.globalData.userId = null;
                    wx.removeStorageSync('token');
                    wx.removeStorageSync('userId');
                    wx.reLaunch({ url: '/pages/auth/login/login' });
                    reject(result);
                }
                else {
                    wx.showToast({ title: result.message || '请求失败', icon: 'none' });
                    reject(result);
                }
            },
            fail(err) {
                wx.showToast({ title: '网络错误', icon: 'none' });
                reject(err);
            },
            complete() {
                if (options.showLoading) {
                    wx.hideLoading();
                }
            },
        });
    });
}
function get(url, data, opts) {
    return request('GET', url, data, opts);
}
function post(url, data, opts) {
    return request('POST', url, data, opts);
}
function put(url, data, opts) {
    return request('PUT', url, data, opts);
}
function del(url, data, opts) {
    return request('DELETE', url, data, opts);
}
