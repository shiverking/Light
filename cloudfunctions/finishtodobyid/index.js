const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    //以下是我写的添加完成时间
    var date = new Date();
    //年
    var year = date.getFullYear();
    //月
    var month = date.getMonth() + 1;
    //日
    var day = date.getDate();
    var rq = year + "-" + month + "-" + day;
    return await db.collection('todo').where({
      todoid: event.todoid
    })
      .update({
        data: {
          isfinished:false,
          finishedtime:rq
        },
      })
  } catch (e) {
    console.error(e)
  }
}