
// 配置api 请求，配置web-view 地址
const  BASE_URL = {
  dev:'http://10.8.10.193',
  uat:'http://10.8.10.193',
  prod:'https://smcs.crb.cn/api'
}
const H5_URL = {
  dev:'http://localhost:3002/#/',
  uat:'http://10.8.10.193',
  prod:'https://smcs.crb.cn/api'
}


 
// 测试账号 wuyang5   1
export default {
  BASE_URL:BASE_URL['dev'],
  H5_URL:H5_URL['dev'],
  UPLOAD_URL: `${BASE_URL['dev']}api/common/upload` //上传服务器的路径
}
