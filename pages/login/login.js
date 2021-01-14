
import {_toast} from './../../utils/util';
const  app = getApp();
import http from '../../HTTP/index'
Component({
    data: {
        showPwd: true, // 是否明文显示密码
        rememberPwd: false, // 记住密码状态
        username: '', // 登录帐号
        password: '', // 登录密码
    },
    ready() {
        if (wx.getStorageSync('account')) {
            let account = wx.getStorageSync('account');
            this.setData({
                username: account.username,
                password: account.password,
                rememberPwd: true
            })
        }
    },
    methods: {
        // 清除帐号
        handleClearUsername() {
            this.setData({
                username: '',
                password: ''
            })
        },
        // 改变记住密码状态
        changeRememberStatus() {
            this.setData({
                rememberPwd: !this.data.rememberPwd
            })
        },

        // 改变密码显隐
        handleChangeSeePwdStatus() {
            this.setData({
                showPwd: !this.data.showPwd
            })
        },

        // 执行登录
        handleLogin() { //supplier
            let data = this.data;
            if (data.rememberPwd) {
                wx.setStorageSync('account', {
                    username: data.username,
                    password: data.password
                })
            } else {
                wx.removeStorageSync('account')
            }
            if (!data.username) {
                 _toast('帐号不能为空', 'error');
                return;
            }
            if (!data.password) {
                 _toast('密码不能为空', 'error');
                return;
            }
            wx.showLoading({
              title: '登录中...',
              mask: true
            })
            http.api('/staff/login',{
                account:this.data.username,
                password:this.data.password,
                source:'mobile'
              },'POST',
              {
                "Content-Type":'application/x-www-form-urlencoded',
              }).then((res)=>{
                _toast('登录成功,这是示例')
                wx.hideLoading()
                wx.setStorageSync({
                    key:'token',
                    data:res.token
                })
                app.loginUserInfo = res;
                http.tokenApi(res.token);
                setTimeout(function(){
                    wx.switchTab({
                        url: '/pages/index/index',
                      })
                },0)
              }).catch((res)=>{
                wx.hideLoading();
                _toast(res.message, 'error');
              })
        
         

        },

        // 输入帐号
        handleInputAccount(e) {
            let value = this.validateNumber(e.detail.value)
            if(!value) {
               this.data.password = '' 
            }
            this.setData({
                username: value,
                password: this.data.password
            })
        },
        validateNumber(val) {
                return val;
        },
        // 输入密码
        handleInputPossword(e) {
            this.setData({
                password: e.detail.value
            })
        },

        // 忘记密码
        forgetPwd() {
            // wx.navigateTo({
            //     url: '/pages/forgetPwd/forgetPwd',
            // })
        }
    }
})