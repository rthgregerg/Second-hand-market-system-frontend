"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleImages = exports.uploadImages = void 0;
const BASE_URL = 'http://localhost:8080';
function uploadImages(files) {
    const app = getApp();
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: BASE_URL + '/api/v1/files/upload',
            filePath: files[0],
            name: 'files',
            header: { Authorization: `Bearer ${app.globalData.token}` },
            success(res) {
                const result = JSON.parse(res.data);
                if (result.code === 200)
                    resolve(result.data);
                else
                    reject(result);
            },
            fail: reject,
        });
    });
}
exports.uploadImages = uploadImages;
async function uploadMultipleImages(filePaths) {
    const urls = [];
    for (const path of filePaths) {
        const result = await uploadImages([path]);
        urls.push(...result);
    }
    return urls;
}
exports.uploadMultipleImages = uploadMultipleImages;
