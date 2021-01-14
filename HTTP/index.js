import config from '../config/index'
let _token = wx.getStorageSync('token') || ''
import { _toast } from './../utils/util';

class Http {
  // 访问路由前缀
  constructor() {
    this.baseURL = config.BASE_URL;
    this.requestTask = null;
    this.header = {
      "Content-Type": 'application/json',
    }
  }

  // 实际调用方法
  api(url, data = {},
    method = 'POST',
    config = {
      "Content-Type": 'application/json'
    }) {
    const _header = Object.assign(this.header, config)

    return new Promise((resolve, reject) => {
      this.requestTask = wx.request({
        url: `${this.baseURL}${url}`,
        method,
        data,
        timeout: 10000,
        header: {
          'Authorization': _token,
          ..._header

        },
        fail: res => {
          _toast(res.data.message, 'error')

        },
        success: res => {
          switch (res.data.code) {
            case 401:
              _toast(res.data.message, 'error')

              wx.removeStorageSync({
                key: 'token'
              })
              wx.hideLoading()
              reject(res.data);
            case 404:

              reject(res.data);
              break;
            case 200:
              resolve(res.data.result);
              break;
            case 500:


              _toast(res.data.message, 'error')
              reject(res.data)
              break;
            default:

              _toast(res.data.message, 'error')
              reject(res.data);
          }
        }
      })
    })
  }

  tokenApi(token) {
    //做个串型赋值
    this.header['Authorization'] = token;
    return this;
  }

  onHeadersReceived(cb) {
    if (this.requestTask) {
      this.requestTask.onHeadersReceived(cb);
    }
  }

  abort() {
    if (this.requestTask) {
      this.requestTask.abort();
    }
  }
}


const _http = new Http()
export default _http;