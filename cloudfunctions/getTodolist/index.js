// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection('userlist').where({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> master
    todoid: event.todoid 
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master
=======
    todoid: event.todoid 
=======
<<<<<<< HEAD
>>>>>>> master
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master
>>>>>>> master
<<<<<<< HEAD
    todoid: event.todoid // 填入当前用户 openid
=======
    todoid: event.todoid 
>>>>>>> master
=======
    todoid: event.todoid 
>>>>>>> master
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> master
>>>>>>> master
>>>>>>> master
>>>>>>> master
>>>>>>> master
  }).get()
}