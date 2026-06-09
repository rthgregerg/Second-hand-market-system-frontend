"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.request = void 0;
const BASE_URL = 'http://localhost:8080';
function cleanData(data) {
    if (data == null)
        return data;
    if (Array.isArray(data))
        return data;
    const result = {};
    for (const [k, v] of Object.entries(data)) {
        if (v !== undefined && v !== null && v !== '') {
            result[k] = v;
        }
    }
    return result;
}
function request(method, url, data, options = {}) {
    const app = getApp();
    const token = app.globalData.token;
    // Skip authenticated requests when no token (prevent 403 spam)
    if (!token && !url.startsWith('/api/v1/auth') && method === 'GET') {
        const publicPaths = ['/api/v1/products', '/api/v1/categories'];
        const isPublic = publicPaths.some(p => url.startsWith(p));
        if (!isPublic) {
            return Promise.reject({ code: 401, message: '未登录' });
        }
    }
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
    data = method === 'GET' ? cleanData(data) : data;
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
exports.request = request;
function get(url, data, opts) {
    return request('GET', url, data, opts);
}
exports.get = get;
function post(url, data, opts) {
    return request('POST', url, data, opts);
}
exports.post = post;
function put(url, data, opts) {
    return request('PUT', url, data, opts);
}
exports.put = put;
function del(url, data, opts) {
    return request('DELETE', url, data, opts);
}
exports.del = del;
