import Toast from '@vant/weapp/toast/index';
const app = getApp();
Page({
  data: {
    previoustime: new Date().getTime(),
    latertime: "",
    _openid: "",
    describe: "",
    timestamp: "",
    isfinished: false,
    name: "",
    tag: "",
    time: "",
    todoid: "",
    show: false,
    checked: true,
    fathertag: "",
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

  onLoad: function(options) {
    var that = this;
    that.setData({
      fathertag: options.fathertag,
      tag: options.tag
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
  getId: function() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
  },
  chooseTime: function() {
    this.setData({
      show: true,
      currentDate: new Date().getTime()
    })
  },
  cancel: function() {
    this.setData({
      show: false
    })
  },
  avoidClick() {
    this.data.latertime = new Date().getTime()
    if ((this.data.latertime - this.data.previoustime) < 350) {
      this.data.previoustime = this.data.latertime
      return false;
    } else {
      this.data.previoustime = this.data.latertime
      return true;
    }
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
  sTime(event) {
    var time = new Date(event.detail)
    var now = this.formatDate(time)
    this.setData({
      time: now,
      show: false,
      timestamp: event.detail
    })
  },
  onClose: function(event) {
    this.setData({
      [event.target.id]: event.detail
    })
  },
  submit: function() {
    if (this.avoidClick() === true) {
      if (this.data.name === "") {
        wx.showToast({
          title: '请输入名称',
          icon: "none"
        })
      } else if (this.data.time === "") {
        wx.showToast({
          title: '请选择时间',
          icon: "none"
        })
      } else {
        var i = this.getId();
        const db = wx.cloud.database();
        var a = app.globalData.openid;
        a = a.toString
        if (this.data.checked === true) {
          wx.requestSubscribeMessage({
            tmplIds: ['WPDnyqjOmGl2BNilxTtUW1RBXwYPaAtOISjpixlxA9s'],
          })
        }
        db.collection('todo').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              description: this.data.describe,
              time: this.data.time,
              tag: this.data.tag,
              fathertag: this.data.fathertag,
              isfinished: true,
              remind: this.data.checked,
              todoid: i,
              _openid: a,
              name: this.data.name,
              timestamp: this.data.timestamp,
              finishedtime: ""
            }
          })
          .then(res => {
            wx.showToast({
                title: '添加成功',
              }),
              setTimeout(function() {
                wx.navigateBack({})
              }, 1500)
          })
          .catch(console.error)
      }
    }
  },
  onChange: function() {
    var c = !this.data.checked
    this.setData({
      checked: c
    })
  }
})