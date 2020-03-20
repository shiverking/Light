const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    var item = event.item;
    return await db.collection(event.cname).where({
      todoid: event.todoid
    })
      .update({
        data: {
          [item]: event.value
        },
      })
  } catch (e) {
    console.error(e)
  }
}