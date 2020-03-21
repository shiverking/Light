const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('todo').where({
      todoid: event.todoid
    })
      .update({
        data: {
          name: event.lname,
          time: event.ltime,
          tag:event.ltag,
          describe:event.ldescribe
        },
      })
  } catch (e) {
    console.error(e)
  }
}