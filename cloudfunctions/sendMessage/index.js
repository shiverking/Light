// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    var openid = event.todo._openid
    var time = event.todo.time
    var name = event.todo.name
    var describe = event.todo.description
    var tag = event.todo.tag
    const result = await cloud.openapi.subscribeMessage.send(
      {
        touser: openid,
        page:'pages/index/index',
        lang:'zh_CN',
        data:{
          "date2":{
            value:time
          },
          "thing3":{
            value:name
          },
          "thing1":{
            value:tag
          },
        },
        templateId: "WPDnyqjOmGl2BNilxTtUW1RBXwYPaAtOISjpixlxA9s",

      }
    )
  }catch(err){
    console.log(err)
    return err
  }
}