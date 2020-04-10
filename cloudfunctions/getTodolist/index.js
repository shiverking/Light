// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection('userlist').where({
    todoid: event.todoid // 填入当前用户 openid
  }).get()
}