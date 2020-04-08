const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  try {
    return await db.collection('userlist').where({
      _openid: event._openid
    })
      .update({
        data: {
          tag1:event.tag1,
          tag2: event.tag2,
          tag3: event.tag3,
          tag4: event.tag4
        },
      })
  } catch (e) {
    console.error(e)
  }
}