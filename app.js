
//app.js
import http from './HTTP/index';
App({
  onLaunch: function () {

    //  获取顶部
    wx.getSystemInfo({
      success: (res) => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight;
      },
       fail(err) {
         
      }
    })

const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})

  },
 
  globalData: {
    userInfo: null,
    navHeight:null,
    useridLength: false, // 账号状态
    passwdLength: false,// 密码状态
  },
  loginUserInfo: null, //登录用户信息

  // 设置登录用户信息
  setLoginUserInfo(payload){
    this.loginUserInfo = payload;
  }
})