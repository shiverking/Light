// miniprogram/pages/newtask/newtask.js
Page({
  data: {
    show: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ close: false });
  },
  

  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  onClickRight() {
    wx.showToast({ title: '点击按钮', icon: 'none' });
  },
  showdialog: function () {
    this.setData({
      show: true
    })
  },
  onShow: function (event) {
    // 页面出现在前台时执行
    this.setData({
      active: 1 
    })
  },
});