// pages/tododetail/tododetail.js
Page({

  data: {
    todoid: "",
    time: "",
    name: "",
    describe: "",
    timestamp:"",
    tag: "",
    eversettled: "",
    show: false,
    currentDate: new Date().getTime(),
    minminute: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value} 分`
      }
      return value;
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.cloud.callFunction({
      name: "getTodobyid",
      data: {
        todoid: options.todoid
      }
    }).then(res => {
      that.setData({
        todoid: options.todoid,
        time: res.result.data[0].time,
        name: res.result.data[0].name,
        describe: res.result.data[0].describe,
        tag: res.result.data[0].tag
      })
    })
  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },
  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onClickLeft: function() {
    wx.navigateBack({})
  },
  chooseTime: function() {
    this.setData({
      show: true
    })
  },
  onClose: function(event) {
    this.setData({
      [event.target.id]: event.detail
    })
  },
  formatDate: function(now) {
    var year = now.getFullYear(); //取得4位数的年份
    var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
    var date = now.getDate(); //返回日期月份中的天数（1到31）
    var hour = now.getHours(); //返回日期中的小时数（0到23）
    if (hour < 10) {
      hour = "0" + hour
    }
    var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
    if (minute < 10) {
      minute = "0" + minute
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  },
  STime(event) {
    var time = new Date(event.detail)
    var now = this.formatDate(time)
    this.setData({
      timestamp:event.detail,
      time: now,
      show: false
    })
  },
  cancel() {
    this.setData({
      show: false
    })
  },
  submit: function() {
    wx.cloud.callFunction({
      name: "updateTodobyid",
      data: {
        todoid:this.data.todoid,
        lname: this.data.name,
        ltime: this.data.time,
        ldescribe: this.data.describe,
        ltag: this.data.tag,
        ltimestamp:this.data.timestamp
      }
    }).then(res => {
        wx.navigateBack({})
      }
    )
  }
})