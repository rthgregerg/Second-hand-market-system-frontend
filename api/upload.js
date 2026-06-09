"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = uploadImages;
exports.uploadMultipleImages = uploadMultipleImages;
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
async function uploadMultipleImages(filePaths) {
    const urls = [];
    for (const path of filePaths) {
        const result = await uploadImages([path]);
        urls.push(...result);
    }
    return urls;
}
