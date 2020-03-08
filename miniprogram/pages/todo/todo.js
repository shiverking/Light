// miniprogram/pages/todo/todo.js
Page({
  data: {
    show: false,
    currentDate:new Date().getTime(),
    currentTime: "",
    minTime:new Date().getTime(),
     formatter(type, value) {
       if (type === 'hour') {
         return `${value}时`;
       } else if (type === 'minute') {
         return `${value}分`;
       }else if(type === 'month'){
         return `${value}月`
       }else if(type === 'day' ){
         return `${value}日`
       }
       return value;
     },
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },
  timestampToTime: function (timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes();
    return Y + M + D + h + m;
  },
  onInput(event) {
    var that = this;
    var tem = that.timestampToTime(event.detail)
    this.setData({
      currentTime:tem,
    });
    console.log(event);

  },
  onClose() {
    this.setData({ close: false });
  },

  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  showdialog: function () {
    this.setData({
      show: true
    })
  },
  uploadTask: function(e){
    console.log(1);
    const db=wx.cloud.database();
    db.collection('todolist').add(
      {
        data:{
        time:e.detail.value.times,
        todo:e.detail.value.todo},
        success:res=>{
          wx.showToast({
            title: 'success',
          })
        },
        fail:error=>{
          wx.showToast({
            title: 'error',
          })
        }
      }
    )
  },
  dingyue:function(){
    wx.requestSubscribeMessage({
      tmplIds: ['hMHeOZbcHw-poWJeiP6wKo3TThBHokp17a0MxvzqV-o'],
      success(res) {
        wx.showToast({
          title: '成功订阅',
        })
      }
    })
  },
  xiafang:function(){
    console.log("xiafang");
    wx.cloud.callFunction({
      name:"sendMessage",
      success:res=>{
        wx.showToast({
          title: 'success'
        })
      },
      fail:res=>{
        console.log(res)
      }
    })
  }
})