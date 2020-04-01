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
    const result = await cloud.openapi.subscribeMessage.send(
      {
        touser: openid,
        page:'pages/index/index',
        lang:'zh_CN',
        data:{
          "time5":{
            value:time
<<<<<<< HEAD
=======
<<<<<<< HEAD
          },
          "thing2":{
            value:describe
=======
>>>>>>> master
>>>>>>> master
          },
          "thing1":{
            value:name
          },
        },
<<<<<<< HEAD
        templateId: "NN4Ya1CMug3KGNYJa5CXFQtVYF_agQqVp7pMTvKFLQQ",
=======
<<<<<<< HEAD
        templateId: "NN4Ya1CMug3KGNYJa5CXFaSAeX4CD8UFtEJcj44ee8c",
=======
        templateId: "NN4Ya1CMug3KGNYJa5CXFQtVYF_agQqVp7pMTvKFLQQ",
>>>>>>> master
>>>>>>> master
      }
    )
  }catch(err){
    console.log(err)
    return err
  }
}