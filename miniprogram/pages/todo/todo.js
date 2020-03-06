// miniprogram/pages/todo/todo.js
Page({
  data: {
    active: 0,
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png'
    }
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  }
})