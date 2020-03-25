// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('todo').where({
    _openid: wxContext.OPENID // 填入当前用户 openid
  }).get()
}