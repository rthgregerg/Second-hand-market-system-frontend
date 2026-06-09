const BASE_URL = 'http://localhost:8080';

export function uploadImages(files: string[]): Promise<string[]> {
  const app = getApp<IAppOption>();
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: BASE_URL + '/api/v1/files/upload',
      filePath: files[0],
      name: 'files',
      header: { Authorization: `Bearer ${app.globalData.token}` },
      success(res) {
        const result: ApiResult<string[]> = JSON.parse(res.data);
        if (result.code === 200) resolve(result.data);
        else reject(result);
      },
      fail: reject,
    });
  });
}

export async function uploadMultipleImages(filePaths: string[]): Promise<string[]> {
  const urls: string[] = [];
  for (const path of filePaths) {
    const result = await uploadImages([path]);
    urls.push(...result);
  }
  return urls;
}
