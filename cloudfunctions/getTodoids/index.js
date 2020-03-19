// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection('todo').where({
    _openid: 'o5EIh5YQ94HhfOj3B-s_cEJsTV8M' // 填入当前用户 openid
  }).get()
}