// miniprogram/pages/me/timeline/timeline.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dealed_finished_info:''//处理过的任务完成信息
  },
  //返回上一层
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  //获取完成任务情况并进行信息处理
  task_info :function(finished_info){
    //根据时间对完成的任务进行排序，时间越近排在越前
    var length = finished_info.length;
    var finishedtask = finished_info.sort(function (a, b){
      var s1 = a.finishedtime;
      var s2 = b.finishedtime;
      return ((new Date(s2.replace(/-/g, '/'))) - (new Date(s1.replace(/-/g, '/'))));
    });
    var tmp_info = new Array();
    var tmp_time;//记录一个临时时间
    var repeat_time = 0;//记录相同时间的重复的次数
    for(var i=0;i<length;i++){
      if (tmp_time == finishedtask[i].finishedtime){//如果是同一天完成的任务
        tmp_info[i - (repeat_time + 1)].task_name = tmp_info[i - (repeat_time + 1)].task_name + "\n&emsp;" + finishedtask[i].name;
        repeat_time+=1;
      }
      else if (tmp_time != finishedtask[i].finishedtime){
        tmp_time = finishedtask[i].finishedtime;//更新记录的日期
        var new_item ={
        task_name: finishedtask[i].name,
        finished_time: finishedtask[i].finishedtime
        }
        tmp_info.push(new_item);
      }
    }
    this.setData({
      dealed_finished_info: tmp_info,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.task_info(app.globalData.gftem);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})