// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const wxContext = cloud.getWXContext();
    const result = await cloud.openapi.subscribeMessage.send(
      {
        touser: wxContext.OPENID,
        page:'pages/index/index',
        lang:'zh_CN',
        data:{
          "time5":{
            value:"2020-3-8"
          },
          "phrase6":{
            value:"TEST"
          },
          "number3":{
            value:1
          },
          "thing1":{
            value:"EEEEEEE"
          },
          temlatedId:"hMHeOZbcHw-poWJeiP6wKo3TThBHokp17a0MxvzqV-o"
        },
        success:res=>{
          console.log("cloudchenggong")
        }
      }
    )
  }catch(err){
    console.log(err)
    return err
  }
}