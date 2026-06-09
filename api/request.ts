const BASE_URL = 'http://localhost:8080';

interface RequestOptions {
  showLoading?: boolean;
  isUpload?: boolean;
}

export function request<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  options: RequestOptions = {}
): Promise<ApiResult<T>> {
  const app = getApp<IAppOption>();
  const token = app.globalData.token;

  if (options.showLoading) {
    wx.showLoading({ title: '加载中...', mask: true });
  }

  const header: Record<string, string> = {};
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
      success(res: WechatMiniprogram.RequestSuccessCallbackResult) {
        const result = res.data as ApiResult<T>;
        if (result.code === 200) {
          resolve(result);
        } else if (result.code === 401) {
          app.globalData.token = null;
          app.globalData.userId = null;
          wx.removeStorageSync('token');
          wx.removeStorageSync('userId');
          wx.reLaunch({ url: '/pages/auth/login/login' });
          reject(result);
        } else {
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

export function get<T>(url: string, data?: any, opts?: RequestOptions) {
  return request<T>('GET', url, data, opts);
}

export function post<T>(url: string, data?: any, opts?: RequestOptions) {
  return request<T>('POST', url, data, opts);
}

export function put<T>(url: string, data?: any, opts?: RequestOptions) {
  return request<T>('PUT', url, data, opts);
}

export function del<T>(url: string, data?: any, opts?: RequestOptions) {
  return request<T>('DELETE', url, data, opts);
}
