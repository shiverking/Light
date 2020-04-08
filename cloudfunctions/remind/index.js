// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const exectasks = [];
  let todoRes = await db.collection('todo').where({
    isfinished: true,
    remind: true
  }).get();
  let todos = todoRes.data;
  let currentDate = new Date().getTime();
  try {
    for (var i = 0; i < todos.length; i++) {
      var t = todos[i].timestamp;
<<<<<<< HEAD
      if (t < currentDate-6000 && t >= currentDate-12000 ) {
=======
<<<<<<< HEAD
      if (t < currentDate && t >= currentDate-6000 ) {
=======
      if (t < currentDate-6000 && t >= currentDate-12000 ) {
>>>>>>> master
>>>>>>> master
        exectasks.push(todos[i])
      }
    }
  } catch (e) {
    console.log(e)
  }
  for (var i = 0; i < exectasks.length; i++) {
    var ttodo = exectasks[i];
    try {
      await cloud.callFunction({
        name: 'sendMessage',
        data: {
          todo: ttodo
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

}