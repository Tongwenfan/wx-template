// import { Http } from './../HTTP/index';


// 可以将一些公共的代码抽离成为一个单独的 js(utils.js)文件，作为一个模块;
// 模块只有通过 module.exports 或者 exports 才能对外暴露接口。
// 所以当你在util.js里封装的方法想要在外部使用的话, 必须通过 module.exports 或者 exports 对外暴露
// 使用 require(path) 将公共代码引入
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 
 * @copyright 华润（成都）雪花啤酒雪花移动客服平台
 * @author tong
 * @createTime 2020-07-10
 * @description 获取网络时间戳
 * @param {String} timeFormat 时间戳格式，用于传递给timeStampTransformationTime返回指定格式
 */
export const getWebTime = timeFormat => {
  // let webTimeStamp = await Http.request('');
  let time = '2020-07'
  return time
}

/**
 * 
 * @copyright 华润（成都）雪花啤酒雪花移动客服平台
 * @author tong
 * @createTime 2020-07-10
 * @description 获取网络时间戳
 * @param {String} timeStamp 需要转换的时间戳
 * @param {String} timeFormat 指定转换的时间格式
 */
export const timeStampTransformationTime = (timeStamp, timeFormat) => {
  
}


/**
 * 
 * @copyright 华润（成都）雪花啤酒雪花移动客服平台
 * @author tong
 * @createTime 2020-07-29
 * @description 二次封装消息弹窗
 * @param {String} messageType 消息类型，success成功。warn警告。error错误
 */
export const _toast = async (title, messageType = 'success', duration = 1500) => {
  let imageUrl = ''
  switch(messageType){
    case 'success':
      imageUrl = '/utils/utilImg/success_icon.png';
      break;
    case 'error':
      imageUrl = '/utils/utilImg/error_icon.png';
      break;
    case 'warn':
      imageUrl = '/utils/utilImg/warn_icon.png';
      break;
  }
  return new Promise(resolve => {
    wx.showToast({
      title,
      image: imageUrl,
      duration,
      success() {
        setTimeout(() => {
          resolve()
        }, duration)
      }
    })
  })
}

/**
 * 
 * @copyright 华润（成都）雪花啤酒雪花移动客服平台
 * @author tongwenfan
 * @createTime 2020-10-01
 * @description 获取当年月
 * @param 
 */
export const initQueryMonthList = function() {
  let data = new Date();
  //获取年
  let year = data.getFullYear();
  //获取月
  let month = data.getMonth() + 1;
  let arry = new Array();
  for (let i = 0; i < 6; i++) {
      let mon = month - i;
      if (mon <= 0) {
          year = year - 1;
          mon = mon + 12;
      }
      if (mon < 10) {
          mon = "0" + mon;
      }

      arry[i] = year + "年" + mon + "月";
  }
  return arry
}